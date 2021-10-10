import React,{ useState } from 'react'
import propTypes from 'prop-types'
import { Form,Card,Button, InputGroup,Spinner } from 'react-bootstrap'
import { FaAt,FaLock, FaSignInAlt } from 'react-icons/fa'

const LoginForm = ({ handleLogin, setUser, loadingVisible, setLoadingVisible }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const login = (event) => {
    event.preventDefault()
    setLoadingVisible(true)
    handleLogin({ username,password })
    setUsername('')
    setPassword('')
  }
  const showWhenVisible = { display : loadingVisible? '': 'none' }
  const hideWhenVisible = { display : loadingVisible? 'none' : '' }




  return(
    <Card style={{ borderRadius:'25px' }} className = "loginForm">
      <Card.Body>
        <Form onSubmit ={login}>
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

          <Button  variant ="primary" type ="submit"  className ="formcomponent" style ={hideWhenVisible}>
            Log In <FaSignInAlt/>
          </Button>
          <Button style = {showWhenVisible} className ="formcomponent"><Spinner animation="grow" role="status"></Spinner> {' '}Logging in</Button>

          <Form.Text>don&lsquo;t have an account? <a href ='#lo'onClick= {() => setUser('newUser')} id='formLink'>Sign Up</a></Form.Text>



        </Form>
      </Card.Body>
    </Card>

  )
}

LoginForm.propTypes = {
  handleLogin: propTypes.func.isRequired,
  loadingVisible: propTypes.bool.isRequired,
  setLoadingVisible: propTypes.func.isRequired,
  setUser: propTypes.func.isRequired
}
export default LoginForm