const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    type: String,
    task: String,
    date: Date,
    importance: String,
    completed: Boolean

})

const theSchema = mongoose.model("theSchema", schema);

module.exports = theSchema;
