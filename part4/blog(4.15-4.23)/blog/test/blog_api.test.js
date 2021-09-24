require('dotenv').config()
const mongoose = require('mongoose')
const supertest = require('supertest')
const blogList = require('./blogs_list')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const loginDetails = {
    username: process.env.username,
    password: process.env.password
}
beforeEach(async()=>{
    await Blog.deleteMany({})
    await Blog.insertMany(blogList.blogs)
})

describe('when there is an intial blog post', () =>{
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

})

describe('addition of a new blog post',() =>{
   
    test('test that a blog wiht correct user authorization token can be saved successfully', async() =>{
        const blogToPost = blogList.listWithOneBlog[0]
        const login = await api
        .post('/api/login')
        .send(loginDetails)
        .expect(200)

        await api
        .post('/api/blogs')
        .set('authorization', `bearer ${login.body.token}`)
        .send(blogToPost)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const returnedBlogs = await blogList.blogsInDb()
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
        const login = await api
        .post('/api/login')
        .send(loginDetails)
        .expect(200)

        await api
            .post('/api/blogs')
            .set('authorization', `bearer ${login.body.token}`)
            .send(testBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const returnedBlogs = await blogList.blogsInDb()
        const returnedBlog = returnedBlogs.slice(-1)
        expect(returnedBlog[0].likes).toBe(0)
        
    })

    test('test if the title and url is missing, the server will return response code 400', async () =>{
        const blogToTest = {
            author: 'jamiu saka',
            likes: 5
        }
        const login = await api
        .post('/api/login')
        .send(loginDetails)
        .expect(200)

        await api
            .post('/api/blogs')
            .set('authorization', `bearer ${login.body.token}`)
            .send(blogToTest)
            .expect(400)

        const returnedBlogs = await blogList.blogsInDb()

        expect(returnedBlogs).toHaveLength(blogList.blogs.length)
        
        
    })

})

/*describe('deletion of a blog post', () =>{
    test('test that a specidfic blog post can be deleted and the server returned status code 204', async() =>{
        const blogInDb = await blogList.blogsInDb()
        const testBlog = blogInDb[0]

        await api
          .delete(`/api/blogs/${testBlog._id}`)
          .expect(204)

        const blogsInDb = await blogList.blogsInDb()
        const title = blogsInDb.map(blog => blog.title)
        expect(title).not.toContain(testBlog.title)
        expect(blogsInDb).toHaveLength(blogList.blogs.length - 1)
    })
})

describe('update of a blog post', () =>{
    test('test the the likes of a blog post can be updated',async () =>{
        const blogsInDb = await blogList.blogsInDb()
        const testBlog = blogsInDb[0]
        testBlog.likes = testBlog.likes +  5

        await api
          .put(`/api/blogs/${testBlog.id}`)
          .send({likes: testBlog.likes})
          .expect(200)

        const updatedBlogs = await blogList.blogsInDb()
        const updatedBlog = updatedBlogs[0]
        expect(updatedBlog.likes).toBe(blogList.blogs[0].likes + 5)
    })
})
*/
afterAll(() =>{
    mongoose.connection.close()
})