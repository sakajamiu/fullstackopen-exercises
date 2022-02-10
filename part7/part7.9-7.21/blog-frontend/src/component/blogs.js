
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { ListGroup,Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Blogs = () => {
  const blogs = useSelector(({ blog }) => blog.sort((a,b) => b.likes - a.likes ))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return(
    <Row >
      <Col sm={6}>
        <div style={{ marginTop:'25px' }}>
          <h1>Blogs</h1>
          <ListGroup >
            {blogs.map( blog =>
              <ListGroup.Item key = {blog.id}>
                <Link to= {`${blog.id}`}>{blog.title} by {blog.author}</Link>
              </ListGroup.Item>)}
          </ListGroup>
        </div>
      </Col>
    </Row>
  )
}

export default Blogs