import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap'
import {FaBook,  FaUser} from 'react-icons/fa'

const NavbarHeader = ({user,setUser}) =>{

    
    const NavLink = () =>{
        if(user === null){
            return <Nav.Link style ={{color:'white'}} onClick ={()=> setUser('newUser')}>Sign Up</Nav.Link>

        }
        else if(user=== 'newUser'){
            return <Nav.Link style ={{color:'white'}} onClick ={()=> setUser(null)}>Log In</Nav.Link>

        }else{
            return <Navbar.Brand ><FaUser/> {'  '}{user.username}</Navbar.Brand>

        }
    }

 return (
    <Navbar bg = "primary" variant ="dark" expand ="md">
        <Container>
            <Navbar.Brand>
                <FaBook/>
                {' '}
                Blog
            </Navbar.Brand>
            <Navbar.Toggle aria-controls = "basic-navbar-nav"/>
            <Navbar.Collapse className = "justify-content-end"  id="basic-navbar-nav">
                {NavLink ()}
            </Navbar.Collapse>

        </Container>
    </Navbar>
 )
}
export default NavbarHeader