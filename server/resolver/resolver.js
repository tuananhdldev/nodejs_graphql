
const { books, authors } = require('../data/static')
const Book = require('../model/Book')
const Author =  require('../model/Author')
const resolvers = {
    Query:
    {
        books: async (parent,args, {mongodataMethod}) =>  await mongodataMethod.getAllBooks()
        ,
        book: async (parent, {id},{mongodataMethod}) => await mongodataMethod.getBookById(id)
        ,
        authors: async(parent, agrs, {mongodataMethod}) => await mongodataMethod.getAllAuthors(),
        author: async (parent, {id},{mongodataMethod}) => await mongodataMethod.getAuthorbyId(id),
    },
    Book:{
        author: async (parent, args, {mongodataMethod})=> await mongodataMethod.getAuthorbyId(parent.authorId)
    },
    Author:{
        books: async (parent,args,{mongodataMethod})=> await mongodataMethod.getAllBooks({authorId: parent.id})
        
    },
   //MUTATION
   Mutation: {
      createAuthor: async (parent,args, {mongodataMethod})=> await mongodataMethod.createAuthor(args),
      createBook: async (parent,args,{mongodataMethod})=>  await mongodataMethod.createBook(args)

   }  

}
module.exports = resolvers