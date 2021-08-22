
import React from 'react';
import TooManyCountry from './TooManyCountry';
import FilteredCountry from './FilteredCountry';
import LessThanTenCountry from './LessThanTenCountry';


 
const Country = ({countriesToDisplay}) =>{
        

    return(
        <div >
            {

                countriesToDisplay.length > 10 ? 

                <TooManyCountry countries={countriesToDisplay}/>
                :
                countriesToDisplay.length < 10 && countriesToDisplay.length> 1 ?

                <LessThanTenCountry countries ={countriesToDisplay}/> 
                :
                <FilteredCountry countries ={countriesToDisplay}/> 
               
                

               
            }

        </div>
       

    )
}

export default Country;
  