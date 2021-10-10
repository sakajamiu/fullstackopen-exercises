import React,{useState}from "react";
import {Button} from 'react-bootstrap'
import { FaThumbsUp } from "react-icons/fa";

const Blog = ({blog, updateLikes, deleteBlogs}) =>{
    const [isVisible, setIsVisible] = useState(false)

    const showWhenVisible ={display: isVisible? '': 'none'}
    
    

    return (
        <div className = 'blog'>
            {blog.title} {blog.author} <Button onClick ={() =>setIsVisible(!isVisible)}>{isVisible? 'hide': 'view'}</Button>
            <div style = {showWhenVisible} >
                <a href = {blog.url}>{blog.url}</a> 
                <p> <FaThumbsUp style ={{color : 'blue'}} onClick ={updateLikes}/>{' '}{blog.likes}</p>
                <p>{blog.user.name}</p>
                <Button variant = 'danger' onClick ={deleteBlogs}>remove </Button>

            </div>
        </div>
    ) 
}
export default Blog 