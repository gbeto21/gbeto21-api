const mongoose = require('mongoose')
const Schema = mongoose.Schema

const languageSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        frameworks: [{
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Framework"
        }]
    }
)

module.exports = mongoose.model('Language', languageSchema)