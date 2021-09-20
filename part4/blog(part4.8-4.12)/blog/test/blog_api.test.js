const mongoose = require('mongoose')
const supertest = require('supertest')
const blogList = require('./blogs_list')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async()=>{
    await Blog.deleteMany({})
    for(let blog of blogList.blogs){
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('test that all the blogs are returned and in Json', async() =>{
    const Blogs = await api
                    .get('/api/blogs')
                    .expect(200)
                    .expect('Content-Type', /application\/json/) 
    expect(Blogs.body).toHaveLength(blogList.blogs.length)
})

test('test the id of the blog is formatted as id instead if _id', async() =>{
    const Blogs = await api
                    .get('/api/blogs')
                    .expect(200)
    expect(Blogs.body[0].id).toBeDefined()

})

test('test that a blog can be saved successfully', async() =>{
    const blogToPost = blogList.listWithOneBlog[0]
    await api
      .post('/api/blogs')
      .send(blogToPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
      const blogsInDb = async() => {
        const blogs = await Blog.find({})
        return blogs.map(blog => blog.toJSON())
      }
      const returnedBlogs = await blogsInDb()
      const title = returnedBlogs.map(blog => blog.title)
    expect(returnedBlogs).toHaveLength(blogList.blogs.length + 1)
    
    expect(title).toContain('Go To Statement Considered Harmfuled')
})

test('test that if the likes property of a blog is missing, it will default to zero', async() =>{
    const testBlog = {
      title: 'First class tesytsed',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitionysed.html'
    }

    await api
        .post('/api/blogs')
        .send(testBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsInDb = async() => {
        const blogs = await Blog.find({})
        return blogs
    }

    const returnedBlogs = await blogsInDb()
    const returnedBlog = returnedBlogs.slice(-1)
    expect(returnedBlog[0].likes).toBe(0)
    
})

test('test if the title and url is missing, the server will return response code 400', async () =>{
    const blogToTest = {
        author: 'jamiu saka',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(blogToTest)
        .expect(400)

    const blogsInDb = async() => {
        const blogs = await Blog.find({})
        return blogs
    }

    const returnedBlogs = await blogsInDb()

    expect(returnedBlogs).toHaveLength(blogList.blogs.length)
    
    
})



afterAll(() =>{
    mongoose.connection.close()
})