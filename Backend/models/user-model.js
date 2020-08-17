const mongoose = require('mongoose');

// Importing The Easy Medium Hard Questions 
// Making Them as Refernces 
const Easy = require('./easy-questions')
const Moderate = require('./moderate-questions')
const Difficult = require('./difficult-questions');
const easyQuestions = require('./easy-questions');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    googleId: {
        type: String,
    },
    name: {
        type: String
    },
    email: {
        type: String,
        match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–9-]*[a-z0–9])?/,
    },
    domain: {
        type: Array,
        default: [],
        requried: false
    },
    isadmin: {
        type: Boolean,
        required: false, 
        default: false
    },
    clubs: [{
        type: String,
        required : false
    }]
});


module.exports = mongoose.model('User', userSchema);

    // response: [{
    //     QuestionId : [],
    //     solution: [{
    //                 type: String,
    //                 default: null,
    //                 required: true  
    //             },
    //             {   
    //             type: String, 
    //             required: false,
    //             default: null 
    //         }
    //     ]
    // }]