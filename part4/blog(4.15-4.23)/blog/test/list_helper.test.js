const listHelper = require('../utilities/list_helpers')
const blogList = require('./blogs_list')

test('dummy return one', () =>{
    const result = listHelper.dummy(blogList.blog)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(blogList.listWithOneBlog)
      expect(result).toBe(5)
    })

    test('when list has more than one blog, equals the likes of the total likes ',() =>{
        const result = listHelper.totalLikes(blogList.blogs)
        expect(result).toBe(36)
    })

})

describe('favorite blog', () =>{
    test(' display blog with the highest likes, equals the likes of that', () => {
      const result = listHelper.favoriteBlog(blogList.blogs)
      const expected = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      }
      expect(result).toEqual(expected)
    })

})
describe('author with most blogs', () =>{
  test('test if author with the highest number of blogs name and the count of blogs will be correctly returned', ()=>{
    const result = listHelper.authorWithMostBlogs(blogList.blogs)
    const expected ={
      author: "Robert C. Martin",
      blogs: 3
    }
    expect(result).toEqual(expected)
  })
})

