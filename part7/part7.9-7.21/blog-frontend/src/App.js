import React, { useState,useEffect } from 'react'
//import blogService from './service/blog'
import Blogs from './component/blogs'
import Blog from './component/blog'
import { Container } from 'react-bootstrap'
import LoginForm from './component/loginForm'
//import loginService from './service/login'
//import Notification from './component/Notification'
import BlogForm from './component/BlogForm'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import SignUpform from './component/SignUpForm'
import { useDispatch, useSelector } from 'react-redux'
import { loggeduser } from './reducers/loginUserReducers'
import Users  from './component/Users'
import User from './component/User'
import{
  BrowserRouter as Router,
  Routes,
  Route,
  //Navigate,
  // useParams,
  //useNavigate
} from 'react-router-dom'

const App = () => {

  const [appClassName, setAppClassName] = useState('landingPage')
  const [containerClassName, setContainerClassName] =useState('landingPageContainer')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loggeduser())
  }, [dispatch])
  const user = useSelector(state => state.loginuser)
  if(user !== null && user !== 'newUser' && containerClassName!== ''){
    setAppClassName('dashboard')
    setContainerClassName('')
  }

  return(
    <div className = {appClassName} >
      <Router>
        <Navbar setContainerClassName ={setContainerClassName} setAppClassName={setAppClassName}/>

        <Container className = {containerClassName}>
          <Routes>
            <Route path ='/' element ={<LoginForm />}/>
            <Route path ='/signUp' element ={<SignUpform />}/>
            <Route path = '/blogs' element ={<Blogs />}/>
            <Route path ='/users' element ={<Users/>}/>
            <Route path = '/createBlog' element ={<BlogForm />}/>
            <Route path ='/users/:id' element ={<User/>}/>
            <Route path = '/blogs/:id' element = {<Blog/>}/>

          </Routes>

        </Container>
      </Router>

      <Footer/>
    </div>



  )
}

export default App
