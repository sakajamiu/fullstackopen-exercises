import react from "react";
import { useDispatch, useSelector } from "react-redux";
import { Votes } from "../reducers/anecdoteReducer";

const AnecdoteList = () =>{
    const anecdote = useSelector(state => state.sort(function(a,b){
        return b.votes -a.votes
    }))
    const dispatch = useDispatch()
    const Vote = (id) =>{
        dispatch(Votes(id))
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
                           <button onClick ={() => Vote(anecdote.id)}>Vote</button>
                        </div>
                        
                    </div>
                )
            }
        </div>
    )
}

export default AnecdoteList