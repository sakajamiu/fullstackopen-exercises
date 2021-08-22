import React, { useEffect, useState } from 'react'

import axios from 'axios'
import DisplayWeather from './DisplayWeather'


const Weather = (capital)=>{
    const [isLoading, setLoading] = useState(true)
    const [weatherReport, setWeatherReport] = useState([])

    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY 
 
 
    const params ={access_key: weatherApiKey, query: capital}


    
 const fetchWeather =()=>  axios.get('http://api.weatherstack.com/current', {params})
  .then(response => {
   setWeatherReport (response.data)

   setLoading(false)
  }).catch(error => {
    console.log(error);
  })
  useEffect(fetchWeather,[])

 if(isLoading){
     return(
         <div>fetching weather from api...</div>
     )
 }


    return(
        <div>
        <DisplayWeather  weatherReport = {weatherReport}/>

        
        </div>
          
       
        
           
      
    )
}

export default Weather
  