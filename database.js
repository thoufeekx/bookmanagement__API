
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

    {
        ISBN: "98765book",
        title: "crazy business ideas",
        pubDate: "2021-09-09",
        language: "Ru",
        numPage: 300,
        author: [1, 2],
        publication: [1],
        category: ["business", "education", "romance"],
      },


];



//storage for authors
const authors = [
    {
    id: 1,
    name: "pavan",
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

    {   
        id: 2,
        name: "Virgin Publication",
        books: ["Get lost in the woods"], 
    
        },
];

module.exports = {books, authors, publication};