const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    _id: { type: Number, require: true },
    imageQuestion: { type: String, default: '' },
    question: { type: String, default: '' },
    answer: { type: String, default: '' },
    numberDate: { type: Number, default: '' },
    date: { type: String, default: '' },
    status: { type: Number, default: 0 },
    part: { type: String, default: '' },
    subject: { type: String, default: '' },
}, {
    _id: false,
    timestamp: true
});

let Question = mongoose.model("Question", questionSchema);

module.exports = { Question };