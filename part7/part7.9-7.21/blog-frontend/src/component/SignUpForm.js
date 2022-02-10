import React,{ useState } from 'react'
import { Card, Form, Button, InputGroup } from 'react-bootstrap'
import { FaAt,FaUser,FaLock } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { noUser } from '../reducers/loginUserReducers'
import { Register } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const SignUpform = () => {
  const [username, setUserName] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const addUser = (event) => {
    event.preventDefault()
    dispatch(Register({
      username: username,
      name: name,
      password:password
    }))
    setUserName('')
    setName('')
    setPassword('')
    dispatch(noUser())

  }

  return(
    <Card style = {{ borderRadius:'25px' }} className = 'signUpForm'>
      <Card.Body>
        <Form onSubmit = {addUser}>
          <Form.Group className ="formcomponent">
            <Form.Label> Username</Form.Label>

            <InputGroup>
              <InputGroup.Text id="formIcon"><FaAt/></InputGroup.Text>
              <Form.Control
                type ='text'
                value = {username}
                placeholder = 'enter your username'
                onChange= {({ target }) => setUserName(target.value)}
              />
            </InputGroup>
            <Form.Text>we recommend using your nickname and atleast 3 characters</Form.Text>
          </Form.Group>
          <Form.Group className ="formcomponent">
            <Form.Label>Name</Form.Label>
            <InputGroup>
              <InputGroup.Text id="formIcon"><FaUser/></InputGroup.Text>
              <Form.Control
                type ='text'
                value ={name}
                placeholder="enter your name"
                onChange = {({ target }) => setName(target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className ="formcomponent">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <InputGroup.Text id="formIcon"><FaLock/></InputGroup.Text>
              <Form.Control
                type ="password"
                value ={password}
                placeholder='enter your password'
                onChange ={({ target }) => setPassword(target.value)}
              />
            </InputGroup>
            <Form.Text>password should be at least 4 characters</Form.Text>
          </Form.Group>
          <Button variant = 'primary' type ='submit' className ="formcomponent">Sign Up</Button>
          <Form.Text>Already have an account? <Link to='/' id ='formLink' onClick ={() => dispatch(noUser())}>Log In</Link></Form.Text>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default SignUpform