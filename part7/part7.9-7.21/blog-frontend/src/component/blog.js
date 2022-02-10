import React,  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likedBlog, comment } from '../reducers/blogReducer'
import { FaThumbsUp } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'


const BlogDetail = () => {
  const id = useParams().id
  const blog = useSelector(({ blog }) => blog.find(blog =>  blog.id === id))
  const dispatch = useDispatch()
  const [comments, setComments] = useState('')

  const postComment = () => {
    const commentedBlog = { ...blog, comments: blog.comments.concat(comments) }
    dispatch(comment(commentedBlog))
    setComments('')

  }
  const updateLikes = (blog) => {
    dispatch(likedBlog(blog))
  }
  if(!blog){
    return null
  }

  return(
    <div style={{ marginTop: '25px' }} >
      <h1 style={{ marginTop: '15px' }}>
        {blog.title} {blog.author}
      </h1>
      <a href = {blog.url} style={{ marginTop: '15px' }}>{blog.url}</a>
      <h5 style={{ marginTop: '15px' }}> {blog.likes} likes {' '}<FaThumbsUp style ={{ color : 'blue' }} onClick = {() => updateLikes(blog)} id= 'like'/></h5>
      <h5 style={{ marginTop: '15px' }}> added by {''}{blog.user.name}</h5>
      <div>
        <h5> Comments </h5>
        <input type = 'text' value = {comments} onChange= {(e) => setComments(e.target.value)}/><Button onClick={() => postComment()}>Add Comment</Button>
        {blog.comments.length > 0 ?
          <ul>
            { blog.comments.map(comment =>
              <li key = {comment.id}>{comment}</li>)
            }
          </ul>
          :
          <h6>There is no comment on this blog post</h6>
        }
      </div>

    </div>

  )
}

export default BlogDetail