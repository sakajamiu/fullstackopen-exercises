import React from "react";
import { connect} from "react-redux";
import { CreateAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";


const AnecdoteForm = (props) =>{
   


    const create = async(event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        props.CreateAnecdote(content)
        props.setNotification(`you created '${content}'`, 50)

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

const mapDispatchToProps = {
    CreateAnecdote,
    setNotification
}
const connectAnecdoteForm = connect(null,mapDispatchToProps )(AnecdoteForm)

export default connectAnecdoteForm