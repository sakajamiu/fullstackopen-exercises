const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utilities/middleware').userExtractor

blogRouter.get('/',async (request,response) => {
   const blogs=  await Blog.find({}).populate('user', { username: 1, name: 1})
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

blogRouter.post('/',userExtractor ,async (request,response) => {
    const body = request.body

    const user = request.user
    const blog = new Blog({
        title : body.title,
        author: body.author,
        url : body.url,
        likes: body.likes,
        user : user._id
    })
    const savedBlog =  await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
  

})

blogRouter.delete('/:id',userExtractor, async ( request,response) => {
    const requestId = request.params.id
    const user = request.user
    const blog= await Blog.findById(requestId)
    if(blog.user.toString() ===  user._id.toString()){
    await Blog.findByIdAndRemove(requestId)
    response.status(204).end()
    }
    else{
        response.status(401).json({
            error: 'either blog has been deleted or the wrong user is trying to delete the blog'
        })
    }
    


})
module.exports = blogRouter