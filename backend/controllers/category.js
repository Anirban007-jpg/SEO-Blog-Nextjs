const category = require('../models/category');
const s = require('slugify');

exports.create = (req,res) => {

    const {name} = req.body;
    let slug = s(name).toLowerCase();
    
    category.findOne({slug : slug}).exec((err,cat) => {
        if (cat){
            return res.status(400).json({
                error: "Category already exsits!"
            })
        }
    
        
        let Category = new category({name, slug});
        
        Category.save((err, data) => {
            if (err){
                return res.status(400).json({
                    error: err
                })
            }

            res.json(data);
        })
    })
}

exports.list = (req,res) => {
    category.find({}).exec((err, data) => {
        if (err) {
                return res.status(400).json({
                    error: err
                })
        }

        res.json(data);
    })
}


exports.read = (req,res) => {
    const slug = req.params.slug.toLowerCase();

    category.findOne({slug: slug}).exec((err,cat) => {
        if (err || !cat) {
            return res.status(400).json({
                error: "Such Category does not exsists"
            })
        }

        res.json(cat);
    })
}


exports.Delete = (req,res) => {
    const slug = req.params.slug.toLowerCase();
    category.findOneAndRemove({slug: slug}).exec((err,cat) => {
        if (err || !cat) {
            return res.status(400).json({
                error: "Such Category does not exsists and thus cannot be deleted!!"
            })
        }

        res.json({
            message: `${cat.name} deleted successfully`
        });
    })
}