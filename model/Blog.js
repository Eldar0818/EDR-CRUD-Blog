const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

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
    },
    cloudinary_id: {
        type: String,
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true,
        slug_padding_size: 2
    }
}, {timestamps: true})

module.exports = mongoose.model('Blog', BlogSchema)