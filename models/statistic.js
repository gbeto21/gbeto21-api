const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statisticSchema = new Schema({
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

module.exports = mongoose.model('Statistic', statisticSchema)