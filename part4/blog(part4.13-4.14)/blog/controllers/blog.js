const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/',async (request,response) => {
   const blogs=  await Blog .find({})  
    response.json(blogs)
        
})

blogRouter.get('/:id', async (request,response) => {
    const blog = await Blog.findById(request.params.id)  
    if(blog) {
    response.json(blog)
    }
    else{
        response.status(404).end()
    }

})

blogRouter.put('/:id', async ( request,response) => {
    const body = request.body
    const blog = {
        likes : body.likes
    }

    const updatedBlog = await Blog
        .findByIdAndUpdate(request.params.id, blog, {new : true})
    response.json(updatedBlog)

})

blogRouter.post('/',async (request,response) => {
    const body = request.body
    const blog = new Blog(body)
    const savedBlog =  await blog.save()
    response.json(savedBlog)

})

blogRouter.delete('/:id', async ( request,response) => {
   await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()


})
module.exports = blogRouter