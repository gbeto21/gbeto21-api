const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    framework: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Framework",
        required: true
    }
})

module.exports = mongoose.Model('Project', projectSchema)