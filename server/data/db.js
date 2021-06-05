const Book = require('../model/Book')
const Author = require('../model/Author')

const mongoDataMethods = {
    getAllBooks: async (condition = null) => condition === null?  await Book.find(): await Book.find(condition),
    getBookById: async id => await Book.findById(id),

    getAllAuthors: async () => await Author.find(),
    getAuthorbyId: async id => await Author.findById(id), 
    createAuthor: async agrs=> {
        const newAuthor = new Author(agrs)
        return await newAuthor.save()
    },
    createBook: async agrs => {
        const newBook = new Book(agrs)
        return await newBook.save()
    }
    
}
module.exports = mongoDataMethods