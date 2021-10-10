import React, { useState,useEffect } from 'react'
import blogService from './service/blog'
import Blog from './component/blog'
import { Container } from 'react-bootstrap'
import LoginForm from './component/loginForm'
import loginService from './service/login'
import Notification from './component/Notification'
import BlogForm from './component/BlogForm'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import SignUpform from './component/SignUpForm'
import signUpService from './service/user'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage]= useState(null)
  const [notificationClassName, setNotificationClassName] = useState('')
  const [appClassName, setAppClassName] = useState('landingPage')
  const [containerClassName, setContainerClassName] =useState('landingPageContainer')
  const [loadingVisible , setLoadingVisible] = useState(false)

  useEffect(() => {
    async function fetchData (){
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a,b) => b.likes - a.likes))

    }
    fetchData()

  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      setAppClassName('dashboard')
      setContainerClassName('')
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin =async(newUser) => {

    try{
      const user = await loginService.login(newUser)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setAppClassName('dashboard')
      setContainerClassName('')
      blogService.setToken(user.token)


    }catch(exception){
      setNotificationMessage('wrong username or password')
      setLoadingVisible(false)
      setNotificationClassName('error')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationClassName('')
      }, 3000)
    }
  }


  const handleCreateBlog =async (newBlog) => {
    try{
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setNotificationMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setNotificationClassName('success')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationClassName('')
      }, 3000)
    }catch(exception){
      setNotificationMessage(exception.message)
      setNotificationClassName('error')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationClassName('')
      }, 3000)
    }

  }
  const addUser = async(newUser) => {
    try{
      const register = await signUpService.register(newUser)
      if(register.username){
        setNotificationMessage(`your profile ${register.username} was created successfully, kindly login to continue`)
        setNotificationClassName('success')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationClassName('')
        },5000)
        setUser(null)
      }

    }catch(error){
      setNotificationMessage('try again')
      setNotificationClassName('error')
      setNotificationMessage(() => {
        setNotificationMessage(null)
        setNotificationClassName('')
      },3000)

    }
  }
  const updateLikes = async id => {
    const blog = blogs.find(blog => blog.id === id)
    blog.likes += 1
    try{
      const updatedBlog = await blogService.update(id,blog)
      const updatedblogs = blogs.map(blog => blog.id !== id? blog : updatedBlog)
      setBlogs(updatedblogs.sort((a,b) => b.likes -a.likes))
    }catch(error){
      console.log(error)

    }

  }

  const deleteBlogs = async id => {

    const blog = blogs.find(blog => blog.id === id)
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      try{
        await blogService.remove(id, blog)
        const updatedblogs = blogs.filter(blog => blog.id !== id)
        setBlogs(updatedblogs.sort((a,b) => b.likes - a.likes))
      }catch(error){
        setNotificationMessage(error.message)
        setNotificationClassName('error')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationClassName('')
        }, 3000)
      }
    }
  }


  return(
    <div className = {appClassName} >
      <Navbar user ={user} setUser = {setUser} />

      <Container className = {containerClassName}>

        <div >
          <Notification
            notificationMessage ={notificationMessage}
            notificationClassName = {notificationClassName}
          />

          {user === null ?
            <LoginForm  handleLogin={handleLogin} setUser = {setUser}loadingVisible = {loadingVisible} setLoadingVisible ={setLoadingVisible}/>
            : user === 'newUser' ?
              <SignUpform createUser ={addUser} setUser = {setUser}/>
              :
              <div>

                <BlogForm handleCreateBlog = {handleCreateBlog}/>
                {
                  blogs.map(blog =>

                    <Blog key = {blog.id} blog = {blog} updateLikes={() => updateLikes(blog.id)} deleteBlogs ={() => deleteBlogs(blog.id)}/>

                  )

                }

              </div>
          }

        </div>

      </Container>

      <Footer/>
    </div>



  )
}

export default App
