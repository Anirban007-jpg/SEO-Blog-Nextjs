const User = require('../models/user');
const fo = require('formidable');
const fs = require('fs');
const sid = require('shortid');
const jwt = require('jsonwebtoken');
const ejwt = require('express-jwt');



exports.signup = (req,res) => {
    User.findOne({email: req.body.email}).exec((err,user) => {
      if (user){
        return res.status(400).json({
          error: "User already exsists"
        })
      }

      const {name,email,about,address,mobile_no,password,role} = req.body;
      let username = sid.generate();
      let profile = `${process.env.CLIENT_URL}/profile/${username}`;

      let newUser = new User({name,email,about,address,mobile_no,password,username,profile,role});
      newUser.save((err, success) => {
        if (err){
          return res.status(400).json({
            error: err
          })
        }

        res.json({
          message: "Signup Success! Please Signin"
        });
      });
    })
}

exports.signin = (req,res) => {
    
    const {email,password} = req.body;
    // check if user exsists
    User.findOne({email}).exec((err,user) => {
      if (err || !user){
        return res.status(400).json({
          error: "User with this email does not exsist in Database"
        });
      }
      // authenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          error: "Password does not match"
        });
      }

      // generate a jsonweb token and send it to client
      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

      res.cookie('token', token, {expiresIn: '1d'});

      const {_id,name,email,about,address,mobile_no,username,role} = user;
      return res.json({
        token,
        user : {_id,name,email,about,address,mobile_no,username,role}
      });
    })
}

exports.signout = (req,res) => {
  res.clearCookie("token")
  res.json({
    message: 'Signout Success'
  })
}

exports.requireSignin = ejwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth"
});

exports.authMiddleware = (req,res,next) => {
   const authUserId = req.auth._id;
   User.findById({_id: authUserId}).exec((err,user) => {
     if (err || !user){
      return res.status(400).json({
        error: "User already exsists"
      })
     }

     if (user.role !== 0 || user.role === 1 || user.role === 2){
      return res.status(400).json({
        error: "Customer Resource ! Access Denied"
      })
    }

     req.profile = user;
     next();
   })
}

exports.adminMiddleware = (req,res,next) => {
  const adminUserId = req.auth._id;
  User.findById({_id: adminUserId}).exec((err,user) => {
    if (err || !user){
     return res.status(400).json({
       error: "User already exsists"
     })
    }
    if (user.role !== 1 || user.role === 0 || user.role === 2){
      return res.status(400).json({
        error: "Admin Resource ! Access Denied"
      })
    }

    req.profile = user;
    next();
  })
}

exports.superadminMiddleware = (req,res,next) => {
  const superadminUserId = req.auth._id;
  User.findById({_id: superadminUserId}).exec((err,user) => {
    if (err || !user){
     return res.status(400).json({
       error: "User already exsists"
     })
    }
    if (user.role !== 2 || user.role === 1 || user.role === 0){
      return res.status(400).json({
        error: "Super Admin Resource ! Access Denied"
      })
    }

    req.profile = user;
    next();
  })
}