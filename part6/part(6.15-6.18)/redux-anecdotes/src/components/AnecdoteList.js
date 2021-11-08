import react from "react";
import { useDispatch, useSelector } from "react-redux";
import { Votes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { displayNotification, removeNotification } from "../reducers/notificationDisplayReducer";
const AnecdoteList = () =>{
    const anecdote = useSelector(({anecdote,filter}) => {
        if (filter === ''){
           return anecdote.sort(function(a,b){
                return b.votes -a.votes
            })
        }
            
            return anecdote.filter( anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
       
        
        
        
    }
    )
    
    const dispatch = useDispatch()
    const Vote = (anecdote) =>{
        dispatch(Votes(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`,10))
    }

    return(
        <div>
            {
                anecdote.map(anecdote =>
                    <div key = {anecdote.id}> 
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                           has {anecdote.votes} 
                           <button onClick ={() => Vote(anecdote)}>Vote</button>
                        </div>
                        
                    </div>
                )
            }
        </div>
    )
}

export default AnecdoteList