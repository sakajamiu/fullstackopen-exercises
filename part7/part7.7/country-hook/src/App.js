import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => { 
    async function fetchDAta (){
      const response = await axios.get(`https://restcountries.com/v2/name/${name}?fullText=true`)

      setCountry(response.data)
    }
    fetchDAta()
  },[name])

  return country
}

const Country = ({ country }) => {

  
  if (!country) {
    return null
  }

  if (country.status === 404) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      {country.map( count =>
      <div key = {count.name}>
      <h3>{count.name} </h3>
      <div>capital {count.capital} </div>
      <div>population {count.population}</div> 
      <img src={count.flag} height='100' alt={`flag of ${count.name}`}/>  
      </div>
      )}
      
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}


export default App;
