const mongoose = require('mongoose')
const moment = require('moment');

const gameSchema = new mongoose.Schema({
    pangrams: {
        type: [String],
        required: true
    },
    letters: {
        type: [String],
        required: true
    },
    centerLetter: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 1,
    },
    answers: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: moment().format("YYYY-MM-DD"),
    },
    draft: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Game', gameSchema);