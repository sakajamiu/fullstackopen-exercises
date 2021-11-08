const Notification = (state = 'testing', action ) =>{
    switch(action.type){
        case 'NOTIFICATION':
            return action.message

        default : 
            return state
    }


}
export const setNotification = message =>{
    return{
        type: 'NOTIFICATION',
        message
    }
}



export default Notification