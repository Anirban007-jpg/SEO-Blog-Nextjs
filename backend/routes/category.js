const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware, superadminMiddleware } = require('../controllers/auth');
const { create } = require('../controllers/category');
const { runValidation } = require('../validators');
const { CategoryCreateValidator } = require('../validators/category');


router.post('/category/create', CategoryCreateValidator, runValidation, requireSignin, adminMiddleware, create);


module.exports = router;