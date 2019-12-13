let mongoose = require('mongoose');
// let Novel = require('../models/novels');

let UserSchema = new mongoose.Schema({
        username: String,
        password: String,
        email: String,
        gender: String,
        age: Number,
        novels:[],
        authors:[]
    },
    { collection: 'user' });

module.exports = mongoose.model('User', UserSchema);
