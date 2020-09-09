const mongoose = require('mongoose')
const Schema = mongoose.Schema

const frameworkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    language: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Language'
    },
    projects: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Project'
    }]
})

module.exports = mongoose.model('Framework', frameworkSchema)