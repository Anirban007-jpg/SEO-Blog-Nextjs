const express = require('express');
const router = express.Router();
const { runValidation } = require('../validators');
const {requireSignin, adminMiddleware, authMiddleware} = require('../controllers/auth');
const { create } = require('../controllers/blog');

router.post('/blog/create', requireSignin, adminMiddleware, create)
router.post('/blog/create', requireSignin, authMiddleware, create)

module.exports = router;