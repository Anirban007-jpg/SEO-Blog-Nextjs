const express = require('express');
const router = express.Router();
const { runValidation } = require('../validators');
const {requireSignin, adminMiddleware, authMiddleware} = require('../controllers/auth');
const { create, listBlogs, listBlogswithcatandtag, readBlog,updateblog,removeblog, Blogphoto } = require('../controllers/blog');

router.post('/blog/create', requireSignin, adminMiddleware, create);
router.post('/blog/create', requireSignin, authMiddleware, create);
router.get('/blogs', listBlogs);
router.post('/blogs-categories-tags', listBlogswithcatandtag);
router.get('/blog/:slug', readBlog);
router.post('/blog/:slug', requireSignin, adminMiddleware, removeblog);
router.put('/blog/:slug', requireSignin, adminMiddleware, updateblog);
router.put('/blog/:slug', requireSignin, authMiddleware, updateblog);


router.get('/blog/photo/:slug',Blogphoto)

module.exports = router;