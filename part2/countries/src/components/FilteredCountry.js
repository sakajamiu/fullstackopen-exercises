import React from 'react'
import Weather from './Weather'



const FilteredCountry =({countries})=>{
 
    return(
        <div>
            {
                countries.map(country =>
                    <div key ={country.name}>
                        <h2>{country.name}</h2>
                        <div>
                            <h4>capital {country.capital}</h4>
                            <h4>population {country.population}</h4>
                        </div>
                        <div>
                            <h4>languages</h4>
                            <ul>
                            {
                                country.languages.map(language=>
                                <li key ={language.name}>{language.name}</li>)
                            }
                            </ul>
            
                            <div>
                                <img src ={country.flag} alt ='flag' width='150px' height='150px'/>
                            </div>
                        </div>
                        
                        
            
                    </div>
                )
               
            }
            {
                countries.map(country=><Weather capital = {country.capital} key = {country.capital}/> )
            }
             
        
        </div>
       
    
    
    )
  
}
export default FilteredCountry;