import React,{useState} from 'react'
import {Card, Form, Button, InputGroup} from 'react-bootstrap'
import {FaAt,FaUser,FaLock} from 'react-icons/fa'

const SignUpform = ({createUser, setUser}) =>{
    const [username, setUserName] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const addUser = (event) =>{
        event.preventDefault()
        createUser({
            username: username,
            name: name,
            password:password
        })
        setUserName('')
        setName('')
        setPassword('')

    }

    return(
        <Card style = {{ borderRadius:'25px'}} className = 'signUpForm'>
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
                                onChange= {({target}) => setUserName(target.value)}
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
                                onChange = {({target}) => setName(target.value)}
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
                                onChange ={({target}) => setPassword(target.value)}
                            />
                        </InputGroup>
                        <Form.Text>password should be at least 4 characters</Form.Text>
                    </Form.Group>
                    <Button variant = 'primary' type ='submit' className ="formcomponent">Sign Up</Button>
                    <Form.Text>Already have an account? <a href ='#2' id ='formLink' onClick ={() => setUser(null)}>Log In</a></Form.Text>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default SignUpform