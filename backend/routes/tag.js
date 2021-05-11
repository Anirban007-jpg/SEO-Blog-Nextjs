const express = require('express');
const router = express.Router();
const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { create, list, read, Delete } = require('../controllers/tag');
const { runValidation } = require('../validators');
const {TagCreateValidator} = require('../validators/tag');


router.post('/tag/create', TagCreateValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/tags', list);
router.get('/tag/:slug', read);
// // router.put('/category/:slug', requireSignin, adminMiddleware, update);
router.delete('/tag/:slug', requireSignin, adminMiddleware, Delete);


module.exports = router;