const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    Assigned: String,
    Priority: String,
    Description: String,

})

const theSchema = mongoose.model("theSchema", schema);

module.exports = theSchema;
