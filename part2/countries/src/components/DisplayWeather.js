
import React from 'react'

const DisplayWeather = ({weatherReport})=>{

    return(
        <div>
      

            <h2>  weather  : {weatherReport.location.name}</h2>
            <h4> temperature: {weatherReport.current.temperature} Celcius</h4>
            <img src = {weatherReport.current.weather_icons} alt="flag"/>
            <h4> wind : {weatherReport.current.wind_speed}mph direction {weatherReport.current.wind_dir}</h4>
           

        
       

        
        </div>
          
       
        
           
      
    )
}


export default DisplayWeather