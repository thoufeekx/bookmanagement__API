const mongoose = require("mongoose");

const publicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books:[String],



});
//publication model
const PublicationModel = mongoose.model("publications", publicationSchema);
module.exports = PublicationModel;