import React,{ useState } from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { FaBook,  FaUser,FaSignOutAlt } from 'react-icons/fa'
import { newUser, noUser, logout } from '../reducers/loginUserReducers'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'

const NavbarHeader = ({ setContainerClassName, setAppClassName }) => {
  const[login,setLogin] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.loginuser)
  const SignOut = () => {
    dispatch(logout())
    setContainerClassName('landingPageContainer')
    setAppClassName('landingPage')
    setLogin(false)
    navigate('/')
  }
  const NavLink = () => {
    if(user === null){
      return <Link to= '/signup' style ={{ color:'white', textDecoration:'none' }} onClick ={() => dispatch(newUser())}>Sign Up</Link>

    }
    else if(user=== 'newUser'){
      return <Link to='/' style ={{ color:'white',textDecoration:'none' }} onClick ={() => dispatch(noUser())}>Log In</Link>

    }else{
      return <Navbar.Brand ><FaUser/> {'  '}{user.username}</Navbar.Brand>
    }
  }
  if(user!==null && user!=='newUser' && login ===false){
    setLogin(true)
    navigate('/blogs')
  }
  const User = () => {
    if(user !== null && user!=='newUser'){
      return <Navbar.Brand ><Link to='/users' style ={{ color:'white', textDecoration:'none', paddingLeft:'25px' }}>Users</Link></Navbar.Brand>
    }
    else{
      return null
    }
  }
  const Create = () => {
    if(user !== null && user!=='newUser'){
      return <Navbar.Brand ><Link to='/createBlog' style ={{ color:'white', textDecoration:'none', paddingLeft:'25px' }}>Create Blog</Link></Navbar.Brand>
    }
    else{
      return null
    }
  }
  const LogOut = () => {
    if(user!== null && user!=='newUser'){
      return<Button variant = 'danger' onClick={ () => SignOut()}>Log Out <FaSignOutAlt/></Button>

    }
    else{
      return null
    }
  }
  const blogNavigation = () => {
    if (login === false){
      return '/'
    }
    else{
      return 'blogs'
    }
  }
  return (
    <Navbar bg = "primary" variant ="dark" expand ="md">
      <Container>
        <Navbar.Brand><Link to={`${blogNavigation()}`} style = {{ color:'white', textDecoration:'none' }}>
          <FaBook/>
          {' '}
                Blog</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls = "basic-navbar-nav"/>
        <Navbar.Collapse   id="basic-navbar-nav">
          <Nav className = 'me-auto'>
            {User ()}
            {Create()}
          </Nav>
          <Nav className = "justify-content-end">
            {NavLink ()}
            {LogOut()}
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  )
}
export default NavbarHeader