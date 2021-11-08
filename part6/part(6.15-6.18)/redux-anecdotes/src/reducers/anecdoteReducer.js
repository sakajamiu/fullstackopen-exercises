import anecdotesService from "../services/anecdotes"

const reducer = (state = [], action) => {
 switch (action.type){
   case 'VOTE':
     const id = action.data.id
     return state.map(anecdote => anecdote.id != id? anecdote : action.data)
    case 'NEW ANECDOTE':
      return state.concat(action.data)
    case 'INITIALIZE':
      return action.anecdotes
    default:
      return state
  }
  
}
export const Votes = (anecdote) =>{
   
  return async dispatch => { 
    const anecdoteToVote ={...anecdote, votes:anecdote.votes + 1}
    await anecdotesService.update(anecdoteToVote)
    dispatch({
      type: 'VOTE',
      data: anecdoteToVote
    })


  }
}
export const CreateAnecdote =(anecdote)=>{
  return async dispatch =>{
    const newAnecdote = await anecdotesService.CreateAnecdote(anecdote)
    dispatch({
      type: 'NEW ANECDOTE',
      data: newAnecdote
    })

    
  }
}
export const initializeAnecdotes = () =>{
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(
      {
        type: 'INITIALIZE',
        anecdotes:anecdotes
      }
    )

  }
}
export default reducer