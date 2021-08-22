import React from 'react'


const Person =({person, deletePerson}) =>{
     
    const confirm = () =>{
        if(window.confirm(`Delete ${person.name} ?`)){
            deletePerson()
        }
    }

return(

    <p  className = 'contactDisplay'>  {person.name} : {person.phone} 
          <button onClick ={confirm}>delete</button>
    </p>
    

)




}

  









export default Person