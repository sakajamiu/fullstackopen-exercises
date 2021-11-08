import React from "react";
import { useDispatch } from "react-redux";
import { CreateAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";


const AnecdoteForm = () =>{
    const dispatch = useDispatch()


    const create = async(event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        dispatch(CreateAnecdote(content))
        dispatch(setNotification(`you created '${content}'`, 10))

    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit = {create}>
            <div><input  name = 'newAnecdote'/></div>
            <button type ='submit'>create</button>
            </form>
        </div>
    )

}

export default AnecdoteForm