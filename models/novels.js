let mongoose = require('mongoose');

let NovelSchema = new mongoose.Schema({
        name: String,
        author: String,
        type: String,
        recommender: String,
        grade:{type:Number, default: 0},
        comment: {type: String, default: "Comment:"}
    },
    { collection: 'novels' });

module.exports = mongoose.model('Novel', NovelSchema);
