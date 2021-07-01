const mongoose = require("mongoose");


//creating a book schema
const BookSchema = mongoose.Schema({
    
        ISBN: String,
        title: String,
        pubDate: String,
        language: String,
        numPage: Number,
        author: [Number],
        publication: [Number],
        category: [String],
      
});



// create a book model
const BookModel = mongoose.model("booksandlove",BookSchema);

module.exports = BookModel;