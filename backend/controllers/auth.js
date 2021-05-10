const User = require('../models/user');
const fo = require('formidable');
const fs = require('fs');
const sid = require('shortid');

exports.signup = (req,res) => {
    User.findOne({email: req.body.email}).exec((err,user) => {
      if (user){
        return res.status(400).json({
          error: "User already exsists"
        })
      }

      const {name,email,about,address,mobile_no,password} = req.body;
      let username = sid.generate();
      let profile = `${process.env.CLIENT_URL}/profile/${username}`;

      let newUser = new User({name,email,about,address,mobile_no,password,username,profile});
      newUser.save((err, success) => {
        if (err){
          return res.status(400).json({
            error: err
          })
        }

        res.json({
          message: "Signup Success, Please Signin"
        });
      });
    })
}