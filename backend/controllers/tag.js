const Tag = require('../models/tag');
const s = require('slugify');

exports.create = (req,res) => {

    const {name} = req.body;
    let slug = s(name).toLowerCase();
    
    Tag.findOne({slug : slug}).exec((err,tag) => {
        if (tag){
            return res.status(400).json({
                error: "Tag already exsits!"
            })
        }
    
        
        let t = new Tag({name, slug});
        
        t.save((err, data) => {
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
    Tag.find({}).exec((err, data) => {
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

    Tag.findOne({slug: slug}).exec((err,tag) => {
        if (err || !tag) {
            return res.status(400).json({
                error: "Such Tag does not exsists"
            })
        }

        res.json(tag);
    })
}


exports.Delete = (req,res) => {
    const slug = req.params.slug.toLowerCase();
    Tag.findOneAndRemove({slug: slug}).exec((err,tag) => {
        if (err || !tag) {
            return res.status(400).json({
                error: "Such Tag does not exsists and thus cannot be deleted!!"
            })
        }

        res.json({
            message: "Tag deleted successfully"
        });
    })
}