const Blog = require('../models/blog');
const Tag = require('../models/tag');
const Category = require('../models/category');
const f = require('formidable');
const fs = require('fs');
const s = require('slugify');
const sh = require('string-strip-html');
const _ = require('lodash');
const { smartTrim } = require('../helpers/blog');


exports.create = (req,res) => {
    let form = new f.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err){
            return res.status(400).json({
                error: 'Image could not uploaded'
            })
        }

     
         
        const {title, body, categories, tags} = fields;

        if (!title || !title.length){
            return res.status(400).json({
                error: 'title is required'
            })
        }

        if (!body || body.length < 200){
            return res.status(400).json({
                error: 'Content is too short'
            })
        }

        if (!categories || categories.length === 0){
            return res.status(400).json({
                error:  'At least one category is required'
            })
        }

        if (!tags || tags.length === 0){
            return res.status(400).json({
                error:  'At least one tag is required'
            })
        }

        let blog = new Blog();
        blog.title = title;
        blog.body = body;
        blog.excerpt = smartTrim(body, 32, ' ', ' ...');
        blog.slug = s(title).toLowerCase();
        blog.mtitle = `${title} | ${process.env.APP_NAME}`
        blog.mdescription = sh(body.substring(0,160));
        blog.postedBy = req.auth._id
        // categories and tags
        let arrayofCategories = categories && categories.split(',')
        let arrayofTags = tags && tags.split(',')
        if (files.photo){
            if (files.photo.size > 10000000){
                return res.status(400).json({
                    error: 'Image should be less than 1Mb in size'
                })
            }
            blog.photo.data = fs.readFileSync(files.photo.path)
            blog.photo.contentType = files.photo.type
        }
        blog.save((err,result) => {
            if (err){
                return res.status(400).json({
                    error: err
                })
            }
            // res.json(result);
            Blog.findByIdAndUpdate(result._id, {$push: {categories: arrayofCategories}}, {new:true}).exec((err,result) => {
                if (err){
                    return res.status(400).json({
                        error: err
                    })
                }else{
                    Blog.findByIdAndUpdate(result._id, {$push: {tags: arrayofTags}}, {new:true}).exec((err,result) => {
                        if (err){
                            return res.status(400).json({
                                error: err
                            }) 
                        }else{
                            res.json(result);
                        }
                    })
                }
                
            })
        })

    })
}