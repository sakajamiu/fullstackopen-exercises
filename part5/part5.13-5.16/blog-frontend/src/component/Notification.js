import React from 'react'
const Notification = ({ notificationMessage, notificationClassName }) => (
  <div className = {notificationClassName} >
    <p>{notificationMessage}</p>

  </div>

)

export default Notification