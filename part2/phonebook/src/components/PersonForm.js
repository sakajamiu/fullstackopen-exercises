import React from 'react'


const PersonForm = ({onChange1,onChange2,value1,value2,onSubmit}) =>{
    
 
    return(
      <div>
           <form onSubmit = {onSubmit}>  
        <div>
          name: <input value={value1} onChange = {onChange1}/>
        </div>
        <div>
            phone: <input value={value2} onChange ={onChange2} type= 'number'/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      </div>
    )
}


export default PersonForm