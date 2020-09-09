const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statisticsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Statistics', statisticsSchema)