import React,{ useState } from 'react'
import { Card, Form ,Button } from 'react-bootstrap'



const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author , setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [isVisible, setVisible] = useState(false)
  const addBlog =(event) => {
    event.preventDefault()
    setVisible(false)
    handleCreateBlog ({
      title : title,
      author : author,
      url: url

    })
    setTitle('')
    setAuthor('')
    setUrl('')

  }
  const hideWhenVisible ={ display : isVisible? 'none': '' }
  const showWhenVisible = { display: isVisible? '': 'none' }
  return(
    <div>
      <Button style ={hideWhenVisible} onClick = {() => setVisible(true)}>create new blog</Button>
      <div style ={showWhenVisible}>
        <Card style={ { borderRadius:'25px' }}>


          <Card.Body >
            <h2> Create Blog</h2>
            <Form onSubmit = {addBlog} className ='form'>
              <Form.Group className = 'formcomponent' controlId='blogFormTitle'>
                <Form.Label> Title </Form.Label>
                <Form.Control
                  type = 'text'
                  placeholder ='enter the blog title'
                  value = {title}
                  onChange = {({ target }) => setTitle(target.value)}
                >
                </Form.Control>

              </Form.Group>
              <Form.Group className ='formcomponent' controlId='blogFormAuthor'>
                <Form.Label>Author </Form.Label>
                <Form.Control
                  type ='text'
                  placeholder = 'enter the author name'
                  value = {author}
                  onChange={({ target }) => setAuthor(target.value)}
                >
                </Form.Control>
              </Form.Group>
              <Form.Group className = 'formcomponent' controlId='blogFormUrl'>
                <Form.Label>Url</Form.Label>
                <Form.Control
                  type ='text'
                  placeholder = 'enter the blog url'
                  value = {url}
                  onChange = {({ target }) => setUrl(target.value)}
                >

                </Form.Control>
              </Form.Group>
              <Button className = 'formcomponent' variant = 'primary' type = 'submit'> Create </Button>
              <Button onClick = {() => setVisible(false)}>cancel</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  )

}

export default BlogForm