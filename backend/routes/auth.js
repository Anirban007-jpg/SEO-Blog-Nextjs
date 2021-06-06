const express = require('express');
const router = express.Router();
const {signup, signin, signout,forgotPassword, resetPassword,  preSignup } = require('../controllers/auth');
const { runValidation } = require('../validators');
const { userSignupValidator, userSigninValidator,     forgotPasswordValidator,
    resetPasswordValidator } = require('../validators/auth');


router.post('/pre-signup', userSignupValidator, runValidation, preSignup);
router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.post('/signout', signout);
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);

module.exports = router;