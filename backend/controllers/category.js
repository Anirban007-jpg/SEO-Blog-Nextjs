const category = require('../models/category');
const s = require('slugify');

exports.create = (req,res) => {
    
    category.findOne({name : req.body.name}).exec((err,cat) => {
        if (cat){
            return res.status(400).json({
                error: "Category already exsits!"
            })
        }
    
        let slug = s(name).toLowerCase();


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