import React, { useState,useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [filterValue , setFilterValue] = useState('')

  const hook = ()=>{
   
    axios
    .get('http://localhost:3001/persons')
    .then(response=>{
      setPersons(response.data)
    
    })
    

  }
  useEffect(hook,[])

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
      alert( `${newName} is already in the phonebook`  )
    }
    else if(persons.some(person=> person.phone === newPerson.phone)){
      alert( `${newNumber} is already in the phonebook`  )

    }
    else{
      
      setNewName('')
      setNewNumber('')
      setPersons(persons.concat(newPerson))
    

    }

  }
  const filterPerson =(event)=>{
    setShowAll(false)
    setFilterValue(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange = {filterPerson}/>
      <div>
        <h2>add a New</h2>
      </div>
      <PersonForm onChange1 = {addName} 
        onChange2 ={addNumber}
        value1 ={newName}
        value2 ={newNumber}
        onSubmit = {addPerson}
      />

   
      <h2>Numbers</h2>
      {
        personToShow.map(person =>
        <Person key = {personToShow.indexOf(person)}person ={person}/>)
      }
      
    </div>
  )
}

export default App