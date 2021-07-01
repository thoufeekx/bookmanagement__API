require("dotenv").config();


//Frame work
const express = require("express");

//mongodb something
const mongoose = require("mongoose");


//DataBase
const database = require("./dataBase");

//Models
const BookModel = require("./database/books");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");




//Initialization
const booky = express();

// configuration
//telling  server we use json
booky.use(express.json());

//establish connection for database
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}
)
.then( () => console.log("Access Granted Carbon!!!!!"));




/*
Route               "/"
Description          Get all books
Access               PUBLIC
parameter            NONE
Methods              GET
*/

booky.get("/", async (req, res) =>  
    {
        const getAllBooks =  await BookModel.find();
   return res.json(getAllBooks);
    }
    );



/*
Route               "/"
Description          Get specific book based on ISBN
Access               PUBLIC 
parameter            isbn
Methods              GET 
*/


booky.get("/is/:isbn", async (req, res) => {
   
      const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn})
    // const getSpecificBook = database.books.filter(
     //   (book) => book.ISBN === req.params.isbn);

     //null => in boolean is false
if(!getSpecificBook){
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

booky.get("/c/:category", async (req, res) => {
        
    const getSpecificBook = await BookModel.findOne({category: req.params.category })
    //const getSpecificBook = database.books.filter((book) => 
        // book.category.includes(req.params.category)
         //);

         if(!getSpecificBook){
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

booky.post("/book/add", async (req,res) => {
    
    
    //we will use "req.body" to add new book because it is efficent way than using parameter
    // console.log(req.body);
    //we use destucturing style in JS, new book. more benefit
    const {newBook} = req.body;
  
    const addNewBook = BookModel.create({newBook});
    BookModel.create(newBook);
    //database.books.push(newBook);
    return res.json({ books:addNewBook, message: "Book was added!!"});

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
    //console.log(req.body);
    const {newAuthor} = req.body;

    AuthorModel.create(newAuthor);
    
    //database.authors.push(newAuthor);
    return res.json({message: "Author was added"});
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
    //console.log(req.body);
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
booky.put("/book/update/title/:isbn",async (req, res)=> {
    //two methods 1. for each  .. 2.  forEach

    //forEach directly update data in database objects
    
    //map will not do it directly, It creat an new array

 const updatedData = await BookModel.findOneAndUpdate(
     {ISBN: req.params.isbn,},
      {title: req.body.newBookTitle,},
      {new : true,} //get update data
      );


    //database.books.forEach((book) => {
   //if(book.ISBN == req.params.isbn){
       //logic search and replace
       //if a match is found in url the book title is changed according to the input from the user
      // book.title = req.body.newBookTitle;
       //newBookTitle is edited in post man put request
       //return;   
    //}

    
  return res.json({books: updatedData})

});

///////////////////////////////////////////////////////////////////////////////

/*
Route               "book/update/author"
Description          update new author in books
Access               PUBLIC
parameter            isbn
Methods              PUT
*/
booky.put("/book/update/author/:isbn/:authorId", async (req, res) => {

    //update book database

    // update author database

  
  /*
  
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

   */
         
     const updatedBook = await BookModel.findOneAndUpdate(
         {ISBN: req.params.isbn,},
         {$push: {
             authors: req.body.newAuthor
            }
        },
        {new : true}
     )


   return res.json({books: updatedBook});


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
////////////////////////////////////////////////update publication
/*
Route               "/publication/update/book"
Description          update/add new book to publication
Access               PUBLIC
parameter            isbn
Methods              PUT
*/

booky.put("/publication/update/book/:isbn", (req, res) => {

    //update the publication data base
    database.publication.forEach( (publication) => {
            if(publication.id === req.body.pubId){
                //if id matches with req id(pubId) then go inside books and push isbn 
               return publication.books.push(req.params.isbn);
            }

    });

    //update the book database
    database.books.forEach( (book) =>{

            if(book.ISBN === req.params.isbn){
                book.publication = req.body.pubId;
                return;
            }

    }); 

    return res.json({books: database.books, publication: database.publication,
   message: "Succesfully updated publications" });

});

booky.listen(3000, () => console.log("Server is runnning in port 3000"));


//Talk to mongodb in which mongodb understands => *****
//talk to us in way we understand => jS

//mongoose take our JS code and convert to file that mongodb understands