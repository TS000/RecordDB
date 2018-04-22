const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    artist: String,
    title: String,
    created_at: Date,
    id: mongoose.Schema.ObjectId
})
