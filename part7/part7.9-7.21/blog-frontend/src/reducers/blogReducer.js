import blogService from '../service/blog'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE',
      blogs:blogs
    })
  }

}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(
      {
        type: 'NEW BLOG',
        data: newBlog
      })
  }
}

export const likedBlog = (blogs) => {
  return async dispatch => {
    const likedBlog = { ...blogs,likes: blogs.likes + 1 }
    await blogService.update(likedBlog)
    dispatch(
      {
        type: 'LIKE BLOG',
        data: likedBlog
      }
    )
  }
}
export const comment = (blog) => {
  return async dispatch => {
    await blogService.comment(blog)
    dispatch(
      {
        type :'COMMENT',
        data: blog
      }
    )
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'DELETE',
      data: blog.id
    })
  }
}
const reducer = (state = [], action) => {
  switch(action.type){
  case 'INITIALIZE':
    return action.blogs
  case 'NEW BLOG':
    return state.concat(action.data)
  case 'LIKE BLOG':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'DELETE':
    return state.filter(blogs => blogs.id !== action.data)
  case 'COMMENT':
    return state.map(blog => blog.id!== action.data.id? blog: action.data)
  default:
    return state
  }
}

export default reducer