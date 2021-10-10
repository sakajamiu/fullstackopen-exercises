import React from 'react'
import { Card, Form ,Button} from 'react-bootstrap'


const blogForm = ({title,author,url,setTitle,setAuthor,setUrl,handleCreateBlog}) => (
    <Card style={{width: '30rem', borderRadius:'25px'}}>
        
        <Card.Body>
            <Form onSubmit = {handleCreateBlog}>
                <Form.Group className = 'formcomponent' controlId='blogFormTitle'>
                    <Form.Label> Title </Form.Label>
                    <Form.Control 
                      type = 'text'
                      placeholder ='enter the blog title'
                      value = {title}
                      onChange = {({target}) => setTitle(target.value)}
                    >
                    </Form.Control>

                </Form.Group>
                <Form.Group className ='formcomponent' controlId='blogFormAuthor'>
                    <Form.Label>Author </Form.Label>
                    <Form.Control
                        type ='text'
                        placeholder = 'enter the author name'
                        value = {author}
                        onChange={({target}) => setAuthor(target.value)}
                    >    
                    </Form.Control>
                </Form.Group>
                <Form.Group className = 'formcomponent' controlId='blogFormId'>
                    <Form.Label>Url</Form.Label>
                    <Form.Control
                        type ='text'
                        placeholder = 'enter the blog url'
                        value = {url}
                        onChange = {({target}) => setUrl(target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Button className = 'formcomponent' variant = 'primary' type = 'submit'> Create </Button>
            </Form>
        </Card.Body>
    </Card>

)

export default blogForm