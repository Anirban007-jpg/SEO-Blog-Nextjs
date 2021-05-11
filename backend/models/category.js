const mongoose = require('mongoose');
const crypto = require('crypto');


const categorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    slug: {
        type: String, 
        index: true,
        unique: true
    },
}, {timestamp : true} 
);
    
    
module.exports = mongoose.model('Category', categorySchema);