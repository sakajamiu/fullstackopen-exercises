import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Country from './components/Country';





const App = ()=>{
  const [isloading, setLoading] = useState(true)
  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')

 

  const fetchCountries = () => axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response =>{
       setCountries(response.data)
       setLoading(false)
    }).catch(error => {
      console.log(error)
    })
 
  
  useEffect(fetchCountries,[])
  const countriesToDisplay =  countries.filter(country => country.name.toLowerCase().includes(filterValue.toLowerCase()) )

  const filterCountry =(event) =>{
 
    setFilterValue(event.target.value)
 
     
  }
  if(isloading){
    return(
      <div>fetching country list from api</div>
    )
  }

  return(
    <div>
      <div>
        find countries:<input onChange ={filterCountry}/>
      </div>
      <Country countriesToDisplay = {countriesToDisplay}/>
 

   
 
    </div>
   
  )
}

export default App;
