
const Display = (state = 'none', action) =>{
    switch(action.type){
        case 'DISPLAY':
            return action.style
        case'REMOVE_DISPLAY':
            return action.style
        default:
            return state
    }
}
export const displayNotification = () => {
    return{
        type:'DISPLAY',
        style: 'block'
    }
}

export const removeNotification = () =>{
    return{
        type:'REMOVE_DISPLAY',
        style: 'none'
    }
}

export default Display