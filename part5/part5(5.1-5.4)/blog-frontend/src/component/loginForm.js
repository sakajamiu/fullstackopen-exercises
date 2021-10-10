import React from "react";
import { Form,Card } from 'react-bootstrap'
import {Button} from 'react-bootstrap'

const loginForm = ({username,password,setUsername,setPassword,handleLogin}) =>(
    <Card style={{width: '30rem', borderRadius:'25px'}} className = "loginForm">
      <Card.Body>
        <Form onSubmit ={handleLogin}>
          <Form.Group className = "formcomponent" controlId = "loginUsername">
            <Form.Label>Username</Form.Label>
            
            <Form.Control type ="text
               "value={username} 
                placeholder ="enter your username"
                onChange={({target}) =>setUsername (target.value)}
            />
          

          </Form.Group>
          <Form.Group className = "formcomponent" controlId = "loginPassword">
            <Form.Label>Password</Form.Label>
            
              <Form.Control type ="password"
                  value ={password}
                  placeholder ="enter your password"
                  onChange={({target}) =>setPassword(target.value)}
              />
            
          </Form.Group>
          <Button  variant ="primary" type ="submit"  className ="formcomponent">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>

  )
 export default loginForm