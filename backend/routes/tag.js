const express = require('express');
const router = express.Router();
const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { runValidation } = require('../validators');
const { CategoryCreateValidator } = require('../validators/category');


// router.post('/category/create', CategoryCreateValidator, runValidation, requireSignin, adminMiddleware, create);
// router.get('/categories', list);
// router.get('/category/:slug', read);
// // router.put('/category/:slug', requireSignin, adminMiddleware, update);
// router.delete('/category/:slug', requireSignin, adminMiddleware, Delete);


module.exports = router;