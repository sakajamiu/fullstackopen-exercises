const Filter = (state = '', action) =>{
    switch(action.type){
        case 'FILTER':
            return action.filter
        default:
            return state
    }
}

export const WordFilter = filter =>{
    return{
        type: 'FILTER',
        filter
    }
}


export default Filter