const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        default: 'https://icon-library.com/images/no-photo-icon/no-photo-icon-3.jpg'
    },
}, {timestamps: true})

module.exports = mongoose.model('Blog', BlogSchema)