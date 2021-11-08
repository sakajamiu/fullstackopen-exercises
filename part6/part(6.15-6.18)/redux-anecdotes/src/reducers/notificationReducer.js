import { displayNotification, removeNotification } from "../reducers/notificationDisplayReducer";
const Notification = (state = null, action ) =>{
    switch(action.type){
        case 'NOTIFICATION':
            return action.message

        default : 
            return state
    }


}
export const setNotification = (message, time) =>{
    return  dispatch =>{
        dispatch(displayNotification())
        dispatch(
            {
                type: 'NOTIFICATION',
                message
                
            }
        )
        setTimeout(() =>{
            dispatch(removeNotification())
        }, time*100)
    }
}



export default Notification