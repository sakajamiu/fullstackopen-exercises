import React, { useEffect } from 'react'
import { Users } from '../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const User = () => {
  const user = useSelector(({ users }) => users.sort((a,b) => b.blogs.length - a.blogs.length))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(Users())
  }, [dispatch])
  return(
    <Table striped bordered style ={{ marginTop : '25px' }}>
      <thead>
        <tr>
          <th>Users</th>
          <th>Blogs Created</th>
        </tr>
      </thead>
      <tbody>
        {user.map(users =>
          <tr key = {users.id}>
            <td>
              <Link to ={`${users.id}`} style ={{ textDecoration:'none' }}>
                {users.name}
              </Link>
            </td>

            <td>{users.blogs.length}</td>
          </tr>)}
      </tbody>
    </Table>
  )
}

export default User