
import React from 'react'
import { connect} from 'react-redux'


const Notification = (props) => {
  const notification = props.notification
  const display = props.display
 
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
const mapStateToProps = (state) =>{
  return{
    notification: state.notification,
    display: state.display
  }

}
const connectNotification = connect(mapStateToProps)(Notification)
export default connectNotification