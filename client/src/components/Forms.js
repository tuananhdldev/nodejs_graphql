import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormGroup from 'react-bootstrap/esm/FormGroup'
import { getAuthors, getBooks } from '../graphql-client/queries'
import { useQuery, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import {  addSingleAuthor, addSingleBook } from '../graphql-client/mutation'

const Forms = () => {
    const [newBook, setNewBook] = useState(
        {
            name: '',
            genre: '',
            authorId: ''
        }
    )
    const { name, genre, authorId } = newBook
    const onInputChanged = event => {
        setNewBook({
            ...newBook,
            [event.target.name]: event.target.value
        }
        )
    }

    const onSubmit = event => {
        event.preventDefault()
        addBook({
            variables: { name, genre, authorId },
            refetchQueries: [{ query: getBooks }]

        })
        setNewBook({ name: '', genre: '', authorId: '' })
    }


    const { loading, error, data } = useQuery(getAuthors)

    const [addBook, dataMutation] = useMutation(addSingleBook)
    const [newAuthor,setNewAuthor] = useState(
        {
            name: '',
            age : ''
        }
    )
    const onAuthorInputChange = event =>{
        setNewAuthor({
            ...newAuthor,
            [event.target.name]: event.target.value
        })
    }
    const onSubmitAuthor =event=> {
        event.preventDefault()
        addAuthor({
            variables:{name: newAuthor.name, age: parseInt( newAuthor.age)},
            refetchQueries:[{query: getAuthors}]
           
        })


    }
    const [addAuthor, dataMutationAuthor] = useMutation(addSingleAuthor)
   

    return <Row>
        <Col>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Form.Label> Book Name </Form.Label>
                    <Form.Control required type='text' placeholder='Book name' name='name' onChange={onInputChanged} value={name} />
                </FormGroup>
                <FormGroup>
                    <Form.Label> Book Gerne </Form.Label>
                    <Form.Control required type='text' placeholder='Book genre' name='genre' onChange={onInputChanged} value={genre} />
                </FormGroup>
                <FormGroup>
                    <Form.Label> Author Name </Form.Label>
                    {
                        loading ? (
                            <p>loading author ...</p>
                        ) :
                            (
                                <Form.Control as='select' name='authorId' onChange={onInputChanged} value={authorId} required>
                                    <option disabled value=''>Select author</option>
                                    {
                                        data.authors.map(au =>
                                            <option key={au.id} value={au.id} >{au.name}</option>
                                        )
                                    }
                                </Form.Control>
                            )
                    }

                </FormGroup>
                <Button className='float-right' variant='primary' type='submit' >
                    Add Book
          </Button>
         
            </Form>
        </Col>
        <Col>
            <Form onSubmit = {onSubmitAuthor} >
                <FormGroup>
                    <Form.Label> Author Name </Form.Label>
                    <Form.Control required type='text' placeholder='Author name' name = 'name' value = {newAuthor.name} onChange={onAuthorInputChange} />
                </FormGroup>
                <FormGroup>
                    <Form.Label> Age </Form.Label>
                    <Form.Control required type='number' placeholder='Age' name = 'age' value = {newAuthor.age} onChange={onAuthorInputChange} />
                </FormGroup>
                <Button className='float-right' variant='primary' type='submit'>
                    Add Author
          </Button>
          {
              dataMutationAuthor.called === true?( <p className = 'info'>add author success</p>):''
          }
            </Form>
        </Col>
    </Row>
}
export default Forms