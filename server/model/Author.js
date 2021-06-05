const mogoose = require('mongoose')
const Schema =  mogoose.Schema

const AuthorSchema = Schema({
    name: {
        type: String
    },
    age:{
        type: Number
    }
})
module.exports = mogoose.model('authors', AuthorSchema)
