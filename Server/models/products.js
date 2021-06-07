const mongoose = require('mongoose')
const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: null
    },
    imageUrl: {
        type: String,
        default: ''
    }
})
module.exports = mongoose.model('product', productsSchema)