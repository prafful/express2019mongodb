var mongoose = require('mongoose')

var mongoSchema = mongoose.Schema

var friendSchema = new mongoSchema({
        "name" : String,
        "location" : String,
        "age" : Number,
        "likes" : Number
}, {collection:'cart'})

module.exports = mongoose.model('cart',friendSchema)