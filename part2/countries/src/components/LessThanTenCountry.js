import React,{useState} from 'react'
import ShowClickedCountry from './ShowClickedCountry'


const LessThanTenCountry =({countries})=>{
    const [isClick, setClick] =useState(false)
    const [clickedCountry, setclickedCountry] = useState([])

    const clickedCountryValue = (event)=>{
        setclickedCountry(JSON.parse(event.target.dataset.country))
        setClick(true)
     
        
    }


    
    return(
        <div>
            { isClick?
                <ShowClickedCountry countries = {clickedCountry}/> :
                countries.map(country=>
                    <p key = {country.name}>{country.name}
                        <button data-country={JSON.stringify({ country})} onClick =  {clickedCountryValue}>show
                        </button>
                    </p>
                )
            

            }
        </div>
          
    
            
    )
        

}

export default LessThanTenCountry;