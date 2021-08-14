import React from 'react';


const Header = ({course})=> <h2 key = {course.id}>{course.name}</h2>

const Part = ({part})=>
  <p  >{part.name} {part.exercises}</p>

const Content =({course})=>{

  return(
    <div>
      {
        course.parts.map(part=> <Part key = {part.id}  part = {part}/>)
      }

    </div>
  )

}

const Total = ({course})=>{
  
  let initialValue = 0

  let sum = course.parts.reduce((accumulator,currentValue )=>
    accumulator + currentValue.exercises,initialValue)


  return(

    <p>total of {sum} exercises </p>
    

  )
}
   

const Course = ({course}) =>{




    return(
        <div>
            <Header course = {course}/>
            
              
            <Content course = {course}/>
            <Total course = {course}/>
            
           
        </div>
    )
}










export default Course