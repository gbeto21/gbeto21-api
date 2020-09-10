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
    technologys: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Technology'
    }]
})

module.exports = mongoose.model('Project', projectSchema)