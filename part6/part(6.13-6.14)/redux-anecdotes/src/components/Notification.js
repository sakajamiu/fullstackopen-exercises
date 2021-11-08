
import React from 'react'
import { useSelector} from 'react-redux'


const Notification = () => {
  const notification = useSelector(({notification}) => notification)
  const display = useSelector(({display}) => display)
 
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display : `${display}`
  }
  
  return (
    <div style={style} >
      {notification}
    </div>
  )
}

export default Notification