const express = require("express");


//DataBase
const database = require("./database");

//Initialization
const booky = express();

// configuration
//telling  server we use json
booky.use(express.json());




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
Route               "/lang"
Description          Get specific book based on language
Access               PUBLIC 
parameter            language
Methods              GET 
*/


booky.get("/lang/:language", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language);

if(getSpecificBook.length === 0){
    return res.json({error: `No book found for the language of ${req.params.isbn}`,});
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
Route               "/authors/books/:isbn"
Description          Get all author based on books
Access               PUBLIC
parameter            isbn
Methods              GET
*/
 booky.get("/authors/book/:isbn", (req, res) =>{


    const getSpecificAuthor = database.authors.filter((author) => 
    author.books.includes(req.params.isbn)
    );

    if(getSpecificAuthor.length === 0){
       return res.json({error: `No author found for the book of ${req.params.isbn}`,});
   }

   return res.json({authors: getSpecificAuthor});

});




/*
Route               "/authors/:names"
Description          Get specific authors
Access               PUBLIC
parameter            names
Methods              GET
*/
booky.get("/authors/:name", (req, res) =>{


    const getSpecificAuthor = database.authors.filter(
         (names) => names.name === req.params.name);
    

    if(getSpecificAuthor.length === 0){
       return res.json({error: `No author found for the name of ${req.params.name}`,});
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




/*
Route               "/publication/:name"
Description          Get specific publication with name
Access               PUBLIC
parameter            name
Methods              GET
*/
booky.get("/publication/:name", (req, res) =>  {

   const getSpecificPublication = database.publication.filter( 
       (pubname) => pubname.name === req.params.name);
   

   if(getSpecificPublication.length === 0){
       return res.json({error: `No publication found with name ${req.params.name}`,});
   }
    
   return res.json({pubname: getSpecificPublication});
    
    


});






/*
Route               "/publication/:pubbook"
Description          Get publication with book name
Access               PUBLIC
parameter            pubbook
Methods              GET
*/
booky.get("/publication/book/:pubbook", (req, res) =>  {

    const getSpecificPublication = database.publication.filter( 
        (pubbooks) => pubbooks.books.includes(req.params.pubbook)
    );
    
 
    if(getSpecificPublication.length === 0){
        return res.json({error: `No publication found with book name ${req.params.pubbook}`,});
    }
     
    return res.json({pubbooks: getSpecificPublication});
    });


//////////////////////////////////////////////////////POST

/*
Route               "/book/add"
Description          add new book
Access               PUBLIC
parameter            NONE
Methods              POST
*/

booky.post("/book/add", (req,res) => {
//we will use "req.body" to add new book because it is efficent way than using parameter
    console.log(req.body);
    //we use destucturing style in JS, new book. more benefit
    const {newBook} = req.body;
  
    database.books.push(newBook);
    return res.json({ books: database.books});

    //above code wont work in browser coz broswer only works on GET method
    //we need http client => helper who help you to make http req , like Postman
});

/*
Route               "/author/add/new"
Description          add new author in authors
Access               PUBLIC
parameter            NONE
Methods              POST
*/

booky.post("/author/add/new", (req, res) => {
    //deconstructing in JS
    console.log(req.body);
    const {newAuthor} = req.body;

    
    database.authors.push(newAuthor);
    return res.json({ authors: database.authors});
})

///////////////////////////////////////////POST PUB


/*
Route               "/publication/add/new"
Description          add new publication
Access               PUBLIC
parameter            NONE
Methods              POST
*/

booky.post("/publication/add/new", (req, res) => {
    //deconstructing in JS
    console.log(req.body);
    const {newPublication} = req.body;

    
    database.publication.push(newPublication);
    return res.json({publication: database.publication});
})

/////////////////////////////////////////////////////////PUT
/*
Route               "book/update/title/:isbn"
Description          change title of book
Access               PUBLIC
parameter            isbn
Methods              PUT
*/
booky.put("/book/update/title/:isbn", (req, res)=> {
    //two methods 1. for each  .. 2.  forEach

    //forEach directly update data in database objects
    
    //map will not do it directly, It creat an new array

    database.books.forEach((book) => {
   if(book.ISBN == req.params.isbn){
       //logic search and replace
       //if a match is found in url the book title is changed according to the input from the user
       book.title = req.body.newBookTitle;
       //newBookTitle is edited in post man put request
       return;   
    }

    });
  return res.json({books: database.books})

});

///////////////////////////////////////////////////////////////////////////////

/*
Route               "book/update/author"
Description          update new author in books
Access               PUBLIC
parameter            isbn
Methods              PUT
*/
booky.put("/book/update/author/:isbn/:authorId", (req, res) => {

    //update book database

    // update author database

    database.books.forEach( (book) =>{
        if(book.ISBN == req.params.isbn){
            //checking if input isbn matches with isbn in books.database
            return book.author.push(parseInt(req.params.authorId));
            //then we push author array with parameter of authorId
        }
    });
     //update author database
    database.authors.forEach( (author) => {
        if(author.id === parseInt(req.params.authorId)){
            return author.books.push(req.params.isbn);
        };
    });


   return res.json({books: database.books, authors: database.authors});


});
 


/*
Route               "book/update/author/:name"
Description          change author name
Access               PUBLIC
parameter            isbn
Methods              PUT
*/
booky.put("/book/update/author/:name", (req, res)=> {
    //two methods 1. for each  .. 2.  forEach

    //forEach directly update data in database objects
    
    //map will not do it directly, It creat an new array

    database.authors.forEach((author) => {
   if(author.name == req.params.name){
       //logic search and replace
       //if a match is found in url the book title is changed according to the input from the user
       author.name = req.body.newAuthorName;
       //newBookTitle is edited in post man put request
       return;   
    }

    });
  return res.json({authors: database.authors})

});


/////////////////////////////////////////////////////////////////////////////////////////



/*
Route               "/publication/edit/:name"
Description          change title of publication
Access               PUBLIC
parameter            isbn
Methods              PUT
*/
booky.put("/publication/edit/:names", (req, res)=> {
    //two methods 1. for each  .. 2.  forEach

    //forEach directly update data in database objects
    
    //map will not do it directly, It creat an new array

    database.publication.forEach((publication) => {
   if(publication.name == req.params.names){
       //logic search and replace
       //if a match is found in url the book title is changed according to the input from the user
       publication.name = req.body.newPublicationName;
       //newBookTitle is edited in post man put request
       return;   
    }

    });
  return res.json({publication: database.publication})

});



booky.listen(3000, () => console.log("Server is runnning in port 3000"));
