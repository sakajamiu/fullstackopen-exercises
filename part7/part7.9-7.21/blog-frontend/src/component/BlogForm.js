import React from 'react'
import { Card, Form ,Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import useForm  from '../hook/hook'
import { useNavigate } from 'react-router-dom'



const BlogForm = () => {
  const title = useForm('text')
  const author = useForm('text')
  const url = useForm('text')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const addBlog =(event) => {
    event.preventDefault()
    const blog = {
      title : title.value,
      author : author.value,
      url: url.value

    }
    dispatch(createBlog(blog))
    navigate('/blogs')

  }

  return(
    <div style={{ marginTop: '15px', maxWidth:'800px' }}>
      <div>
        <Card style={ { borderRadius:'25px' }}>


          <Card.Body >
            <h2> Create Blog</h2>
            <Form onSubmit = {addBlog} className ='form'>
              <Form.Group className = 'formcomponent' controlId='blogFormTitle'>
                <Form.Label> Title </Form.Label>
                <Form.Control
                  { ...title }
                >
                </Form.Control>

              </Form.Group>
              <Form.Group className ='formcomponent' controlId='blogFormAuthor'>
                <Form.Label>Author </Form.Label>
                <Form.Control
                  {...author}
                >
                </Form.Control>
              </Form.Group>
              <Form.Group className = 'formcomponent' controlId='blogFormUrl'>
                <Form.Label>Url</Form.Label>
                <Form.Control
                  {...url}
                >

                </Form.Control>
              </Form.Group>
              <Button className = 'formcomponent' variant = 'primary' type = 'submit'id ='blogFormCreate'> Create </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  )

}

export default BlogForm