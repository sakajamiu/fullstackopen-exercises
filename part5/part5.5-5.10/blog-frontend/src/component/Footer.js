import React from 'react'
import { Navbar, Container,Nav } from 'react-bootstrap'
import { FaBook } from 'react-icons/fa'

const Footer = () =>(
    <Navbar  bg = "primary" variant ="dark"  fixed ='bottom' expand ="md">
        <Container>
            <Navbar.Brand>
                <FaBook/>
                {' '}
                Blog
            </Navbar.Brand>
            <Navbar.Toggle aria-controls = "basic-navbar-nav"/>
            <Navbar.Collapse className='justify-content-end'>
                <Nav.Link style ={{color: 'white'}}>About</Nav.Link>
                <Nav.Link style ={{color: 'white'}}>Legal</Nav.Link>
                <Nav.Link style ={{color: 'white'}}>Contact</Nav.Link>

            </Navbar.Collapse>
        </Container>

    </Navbar>
)
export default Footer