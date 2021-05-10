const User = require('../models/user');
const fo = require('formidable');
const fs = require('fs');

exports.signup = (req,res) => {
  const {username,mobile_no,name,email,about,password,address} = req.body;
  res.json({username,mobile_no,name,email,about,password,address});
}