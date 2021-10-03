const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model('Users', UserSchema)