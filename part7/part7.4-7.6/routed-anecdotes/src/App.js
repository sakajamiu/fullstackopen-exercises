import React, { useState } from 'react'
import { useField } from './hook'
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
}
from 'react-router-dom'
const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to ='/' style={padding}>anecdotes</Link>
      <Link to ='/create' style={padding}>create new</Link>
      <Link to = '/about'style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to = {`${anecdote.id}`}>
           {anecdote.content}
          </Link>
        </li>
      )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)
const Anecdote = ({anecdotes}) =>{
  const id =  useParams().id
  const anecdote = anecdotes.find( anecdote => Number(anecdote.id) === Number(id))
  return(
    <div>
      <h2>{anecdote.content}</h2>
      <p> has: {anecdote.votes}</p>
       for more info see <a href = {anecdote.info}>{anecdote.info}</a>
    </div>
  )
}
const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
 const content = useField('text')
 const author = useField('text')
 const info = useField('text')
const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    

    props.addNew({
      content: content.value,
      author: author.value,
      info : info.value,
      votes: 0
    })
    navigate('/')
  }
 const reset = () =>{
   content.value = ''
   author.value = ''
   info.value = ''
 }
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form >
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button onClick = {handleSubmit}>create</button>
        <button onClick = {reset}>reset</button>
        
      </form>
      
      <div>
        {console.log(content.value)}
      {content.value} {author.value} {info.value}
      </div>
    </div>
  )

}
const Notification = ({notification ,setNotification}) =>{
  const [display, setDisplay ] = useState('block')
 
  if (notification === null){
    
    return null
    
  }

  setTimeout(() =>{
      
    setNotification(null)
   
  }, 5000)

 
  return(
    <div style ={{display}}>
      a new anecdote: {notification} created!
     
      
    </div>
  )
} 
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  

  const [notification, setNotification] = useState(null)


  const addNew = (anecdote) => {
    setNotification(anecdote.content)
    console.log(anecdote)
    console.log(anecdote.content)
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    
    
  }
  

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      
      <Router>
        <Menu />
        <Notification notification ={notification} setNotification = {setNotification}/>
        <div>
          <Routes>
            <Route path ='/' element ={<AnecdoteList anecdotes={anecdotes} />}/>
            <Route path ='/:id' element = {<Anecdote anecdotes ={anecdotes}/>}/>
            <Route path ='about' element ={<About />}/>
            <Route path = 'create' element ={<CreateNew addNew={addNew} />}/>
          
          </Routes>
      </div>
      </Router>
       
      <Footer />
    </div>
  )
}

export default App;
