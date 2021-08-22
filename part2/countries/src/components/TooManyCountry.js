import React from 'react'

const  TooManyCountry = ({countries})=>{
    

    if(countries.length > 240){

        return(
            <p></p>
        )
    }
    else{
        return(
            <p >too many matches,specify another filter</p>

        )
    }
}

export default TooManyCountry