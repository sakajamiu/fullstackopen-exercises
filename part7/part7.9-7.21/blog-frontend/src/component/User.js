import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const user  = useSelector(({ users }) => users.find(users => users.id === id ))


  if(!user){
    return null
  }
  return(
    <div style ={{ marginTop: '25px' }}>
      <h1>{user.name}</h1>
      <h4>added blogs</h4>
      {
        user.blogs.length> 0?
          <ul>
            {user.blogs.map(blog =>
              <li key ={blog.id} >{blog.title}</li>)}
          </ul>
          : <h6> user is yet to add a blog</h6>
      }

    </div>
  )
}
export default User