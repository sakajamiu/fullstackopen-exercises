import React, {useState,useEffect} from 'react'
import blogService from './service/blog'
import Blog from './component/blog'
import { Container, Button } from 'react-bootstrap'
import LoginForm from './component/loginForm'
import loginService from './service/login'
import Notification from './component/Notification'
import BlogForm from './component/blogForm'


const App = () =>{
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [notificationMessage, setNotificationMessage]= useState(null)
  const [className, setClassName] = useState('')
  const [title, setTitle] = useState('')
  const [author , setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() =>{
     async function fetchData (){
      const blogs = await blogService.getAll()
      setBlogs(blogs)

     }
     fetchData() 

  }, [])

  useEffect(()=>{
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin =async(event)=>{
    event.preventDefault()
    setUsername('')
    setPassword('')
    try{
      const user = await loginService.login({
      username,password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      

    }catch(exception){
      setNotificationMessage('wrong username or password')
      setClassName('error')
      setTimeout(()=>{
        setNotificationMessage(null)
        setClassName('')
      }, 3000)
    }
  }

  const logOut = () =>{
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleCreateBlog =async (event) =>{
    event.preventDefault()
    const newBlog = {
      title : title,
      author : author,
      url: url

    }
    try{
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
       setTitle('')
       setAuthor('')
       setUrl('')
       setNotificationMessage(`a new blog ${blog.title} by ${blog.author} added`)
       setClassName('success')
       setTimeout(() =>{
         setNotificationMessage(null)
         setClassName('')
       }, 3000)
    }catch(exception){
      setNotificationMessage(exception.message)
      setClassName('error')
      setTimeout(() => {
        setNotificationMessage(null)
        setClassName('')
      }, 3000)
    }

  }



  return(
    <Container >
      <div className = "container"> 
      <Notification 
         notificationMessage ={notificationMessage}
         className = {className}
        />
     
      {user === null ? 
      <LoginForm 
        username= {username}
        password ={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />:
      <div> 
        <h2>Blogs</h2>
        <h3>{user.name} - Logged-in 
            <Button variant ="secondary" onClick ={()=> logOut()}> log Out
            </Button>
        </h3>
        <h2>Create New Blog</h2>
        <BlogForm
          title = {title}
          author = {author}
          url = {url}
          setTitle = {setTitle}
          setAuthor ={setAuthor}
          setUrl ={setUrl}
          handleCreateBlog = {handleCreateBlog}
        />


        {
          blogs.map(blog =>
            
            <Blog key = {blog.id} blog = {blog}/>
            
          )

        }
          
      </div>
      }

    </div>

    </Container>
    
    

  )
}

export default App;
