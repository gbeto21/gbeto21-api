const mongoose = require('mongoose')
const Schema = mongoose.Schema

const frameworkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    technology: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Technology'
    },
    projects: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Project'
    }]
})

module.exports = mongoose.model('Framework', frameworkSchema)