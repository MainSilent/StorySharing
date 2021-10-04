const { Schema, model } = require('mongoose')

const PostSchema = Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = model('Posts', PostSchema)