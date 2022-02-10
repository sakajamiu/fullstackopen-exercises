import React,{ useState } from 'react'
import { Form,Card,Button, InputGroup,Spinner } from 'react-bootstrap'
import { FaAt,FaLock, FaSignInAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { newUser, login } from '../reducers/loginUserReducers'
import { Link } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch()

  const logging = (event) => {
    event.preventDefault()
    dispatch(login({ username,password }))
    setUsername('')
    setPassword('')
  }
  const showWhenVisible ={ display: isVisible? '': 'none' }
  const hideWhenVisible ={ display : isVisible? 'none' : '' }




  return(
    <Card style={{ borderRadius:'25px' }} className = "loginForm">
      <Card.Body>
        <Form onSubmit ={logging}>
          <Form.Group className = "formcomponent" controlId = "loginUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup>
              <InputGroup.Text id ="formIcon" ><FaAt/></InputGroup.Text>
              <Form.Control type ="text
                "value={username}
              placeholder ="enter your username"
              onChange={({ target }) => setUsername (target.value)}
              />
            </InputGroup>

          </Form.Group>
          <Form.Group className = "formcomponent" controlId = "loginPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <InputGroup.Text id = "formIcon"><FaLock/></InputGroup.Text>
              <Form.Control type ="password"
                value ={password}
                placeholder ="enter your password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </InputGroup>

          </Form.Group>

          <Button  variant ="primary" type ="submit"  className ="formcomponent" style ={hideWhenVisible} id='loggin-button' onClick={() => setIsVisible(!isVisible)}>
            Log In <FaSignInAlt/>
          </Button>
          <Button style = {showWhenVisible} className ="formcomponent"><Spinner animation="grow" role="status"></Spinner> {' '}Logging in</Button>

          <Form.Text>don&lsquo;t have an account? <Link to='/signup' onClick= {() => dispatch(newUser())} id='formLink'>Sign Up</Link></Form.Text>



        </Form>
      </Card.Body>
    </Card>

  )
}


export default LoginForm