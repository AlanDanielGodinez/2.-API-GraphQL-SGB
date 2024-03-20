const {ApolloServer, gql} = require('apollo-server');
const fs = require('fs');

const schema = fs.readFileSync("./schema.graphql","utf8");

const authors = [
    { id: "1", name: "Douglas Adams", nationality: "British" },
  { id: "2", name: "George Orwell", nationality: "British" },
  { id: "3", name: "Harper Lee", nationality: "American" },
  { id: "4", name: "J.D. Salinger", nationality: "American" },
  { id: "5", name: "F. Scott Fitzgerald", nationality: "American" },
  { id: "6", name: "Herman Melville", nationality: "American" },
  { id: "7", name: "Jane Austen", nationality: "British" },
  { id: "8", name: "J.R.R. Tolkien", nationality: "British" },
  { id: "9", name: "J.K. Rowling", nationality: "British" },
  { id: "10", name: "Fyodor Dostoevsky", nationality: "Russian" }
]
const books = [
    { id: "1", name: "The Hitchhiker's Guide to the Galaxy", author: "1", isbn: "978-0345391803", year: "1979" },
    { id: "2", name: "1984", author: "2", isbn: "978-0451524935", year: "1949" },
  ];
  
  
  const loans = [
    { id: "1", book: "1", user: "John Doe", dateloan: "2023-01-15", dateback: "2023-02-15" },
    { id: "2", book: "2", user: "Jane Smith", dateloan: "2023-02-20", dateback: "2023-03-20" },
    // Otros préstamos aquí...
  ];

  const resolvers = {
    Query: {
      allAuthors: () => authors,
      allBooks: () => books,
      allLoans: () => loans,
      bookById: (parent, { id }) => books.find(book => book.id === id)
    }, 
    Mutation: {
      createAuthor: (parent, { name, nationality }) => { // Cambio aquí
        const newAuthor = {
          id: String(authors.length + 1), // Se puede usar String() o `${}` para asegurar que el ID sea un string
          name,
          nationality
        };
        authors.push(newAuthor);
        return newAuthor;
      },
  
     //2 updateAuthor: (parent, { id, name, nationality }) => {
        
  
      createBook: (parent, { name, author, isbn, year }) => {
        const newBook = {
          id: String(books.length + 1),
          name,
          author,
          isbn,
          year
        };
        books.push(newBook);
        return newBook;
      },

      createLoan: (parent, { book, user, dateloan, dateback }) => {
        const newLoan = {
          id: String(loans.length + 1),
          book,
          user,
          dateloan, 
          dateback 
        };
      
        loans.push(newLoan);
        return newLoan;
      }
      
          
      
    }
  };
  

const server = new ApolloServer( {
    typeDefs: gql(schema),
    resolvers
});
server.listen().then(({ url }) => {
    console.log(`Servidor corriendo en ${url}`)
});