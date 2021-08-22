import React from 'react';
import Weather from './Weather';
const ShowClickedCountry = ({countries}) =>{
    return(
        <div>
            <h2>{countries.country.name}</h2>
            <div>
                <h4>capital {countries.country.capital}</h4>
                <h4>population {countries.country.population}</h4>
            </div>
            <div>
                <h4>languages</h4>
                <ul>
                  {
                    countries.country.languages.map(language=>
                      <li key ={language.name}>{language.name}</li>)
                  }
                </ul>
  
                <div>
                    <img src ={countries.country.flag} alt ='flag' width='150px' height='150px'/>
                </div>
            </div>
            
            <Weather capital = {countries.country.capital} /> 
            
  
        </div>
    )
}







export default ShowClickedCountry;