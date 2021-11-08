import React from "react";
import { useDispatch } from "react-redux";
import { CreateAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { displayNotification, removeNotification } from "../reducers/notificationDisplayReducer";

const AnecdoteForm = () =>{
    const dispatch = useDispatch()


    const create = (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        dispatch(CreateAnecdote(content))
        dispatch(setNotification(content))
        dispatch(displayNotification())
        setTimeout(()=>{
            dispatch(removeNotification())
        },5000)

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