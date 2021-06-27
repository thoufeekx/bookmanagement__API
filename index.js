const express = require("express");


//DataBase
const database = require("./database");

//Initialization
const booky = express();


/*
Route               "/"
Description          Get all books
Access               PUBLIC
parameter            NONE
Methods              GET
*/

booky.get("/", (req, res) =>  
    {
   return res.json({books: database.books});
    }
    );



/*
Route               "/"
Description          Get specific book based on ISBN
Access               PUBLIC 
parameter            isbn
Methods              GET 
*/


booky.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn);

if(getSpecificBook.length === 0){
    return res.json({error: `No book found for the ISBN of ${req.params.isbn}`,});
}

return res.json({book: getSpecificBook},);

});



/*
Route               /c
Description          Get specific book based on cateogry
Access               PUBLIC 
parameter            category
Methods              GET 
*/

booky.get("/c/:category", (req, res) => {
         const getSpecificBook = database.books.filter((book) => 
         book.category.includes(req.params.category)
         );

         if(getSpecificBook.length === 0){
            return res.json({error: `No book found for the category of ${req.params.category}`,});
        }

        return res.json({book: getSpecificBook},);

});




/*
Route               "/author"
Description          Get all author
Access               PUBLIC
parameter            NONE
Methods              GET
*/

booky.get("/author", (req, res) => {
     return res.json({author: database.authors})
  });




/*
Route               "/author/books/:isbn"
Description          Get all author based on books
Access               PUBLIC
parameter            isbn
Methods              GET
*/
 booky.get("/author/book/:isbn", (req, res) =>{


    const getSpecificAuthor = database.authors.filter((authors) => 
    authors.books.includes(req.params.isbn)
    );

    if(getSpecificAuthor.length === 0){
       return res.json({error: `No author found for the book of ${req.params.isbn}`,});
   }

   return res.json({authors: getSpecificAuthor});

});



/*
Route               "/publication"
Description          Get all publication
Access               PUBLIC
parameter            NONE
Methods              GET
*/
booky.get("/publication", (req, res) =>  
    {
   return res.json({pub: database.publication})
    }
    );

booky.listen(3000, () => console.log("Server is runnning in port 3000"));
