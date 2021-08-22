import React, { useState,useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import phoneServer from './service/phoneServer'
import Notification from './components/Notification'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [filterValue , setFilterValue] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  
  useEffect(() =>{
    phoneServer.getAll()
    .then(initialPersonData => setPersons(initialPersonData))
  },[])

  const personToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()) || person.phone.includes(filterValue))


  const addName = (event)=>{
  
    setNewName(event.target.value)

  }

  const addNumber = (event)=>{
    setNewNumber(event.target.value)
      
  }

  const addPerson = (event)=>{
    event.preventDefault()
    
    
    const newPerson = {
      name:newName,
      phone:newNumber
  

    }

    if(persons.some(person=>person.name.toLowerCase() === newPerson.name.toLowerCase())){
      if(window.confirm( 
        `${newName} is already in the phonebook, 
        do you want to replace the old number with a new one`
        )){

          const updatePerson = persons.find(person => person.name === newPerson.name)

          phoneServer.update(newPerson, updatePerson.id)

           .then(updateData =>
            setPersons(persons.map(person => person.id !==updatePerson.id ? person: updateData)
          )
           
        )
        setNotificationMessage(`${newPerson.name} contact successfully update`)

        setNotificationType('success')

        setNewName('')

        setNewNumber('')

        setTimeout(() => {

          setNotificationMessage(null)

        }, 2000)

      }
    }
    else if(persons.some(person=> person.phone === newPerson.phone)){

      alert( `${newNumber} is already in the phonebook`  )

    }
    else if(newPerson.name === ''|| newPerson.number === ''){
      alert('please fill all the details to add new number')
    }
    else{
      
      setNewName('')

      setNewNumber('')

      phoneServer
        .create(newPerson)
        .then(newpersonData=> setPersons(persons.concat(newpersonData))

      )
      setNotificationMessage(`${newPerson.name} contact successfully added`)

      setNotificationType('success')

      setTimeout(() => {

        setNotificationMessage(null)

      }, 2000)

      
    

    }

  }
  const filterPerson =(event)=>{

    setShowAll(false)

    setFilterValue(event.target.value)

  }
  const deletePersonData = (id) =>{

    const deletePerson = persons.find( person => person.id === id)

    phoneServer
      .deleteData(id)

      .then(deleteData => console.log(deleteData))

      .catch(err =>{
        
          setNotificationMessage(`${deletePerson.name} details was already deleted from server`)

          setNotificationType('error')

          setTimeout(() => {

            setNotificationMessage(null)

          }, 2000)
      })

      setPersons(persons.filter(person => person.id !==id))

      setNotificationMessage(`${deletePerson.name} details is deleted successfully`)

      setNotificationType('success')

      setTimeout(() => {

        setNotificationMessage(null)

      }, 2000)

  }

  return (
    <div  className = 'app'>

      <h2>Phonebook</h2>
      
      <Notification

        message = {notificationMessage}
        type = {notificationType}

      />

      <Filter onChange = {filterPerson}/>

      <div>

        <h2>add a New</h2>

      </div>

      <PersonForm 

        onChange1 = {addName} 
        onChange2 ={addNumber}
        value1 ={newName}
        value2 ={newNumber}
        onSubmit = {addPerson}

      />

   
      <h2>Numbers</h2>
      {

        personToShow.map(person =>

          <Person

            key = {person.id}
            person ={person}
            deletePerson = {()=> deletePersonData(person.id)}

          />
        )

      }
      
    </div>
  )
}

export default App