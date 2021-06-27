
//storage for books 
const books = [ 
    {
      ISBN: "12345Book",
      title: "Getting started with MERN",
      pubDate: "2021-07-07",
      language: "en",
      numPage: 250,
      author: [1, 2],
      publication: [1],
      category: ["tech", "education", "thriller"],
    },


];



//storage for authors
const authors = [
    {
    id: 1,
    name: "Pavan",
    books:["12345Book", "12345678Secret"],
    },

    {   
        id: 2, 
        name: "Elon Musk", 
        books:["12345Book"],  
    },
];


//storage for publications
const publication =[    
    {   
    id: 1,
    name: "writex",
    books: ["12345Book"], 

    },
];

module.exports = {books, authors, publication};