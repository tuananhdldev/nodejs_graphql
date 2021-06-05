import {gql} from '@apollo/client'

const addSingleBook = gql`
  mutation addBookMutation($name: String, $genre: String, $authorId: ID!)
  {
      createBook(name: $name, genre: $genre, authorId: $authorId){
          name
          id
      }
  }
`
const addSingleAuthor = gql`
  mutation addAuthorMutation($name: String, $age: Int)
  {
      createAuthor(name: $name, age: $age){
          name
          id
      }
  }
`
export {addSingleBook, addSingleAuthor}