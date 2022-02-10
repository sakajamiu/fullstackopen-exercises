import loginUser from '../service/login'
import blogService from '../service/blog'

export const login = (userDetails) => {
  return async dispatch => {
    const loggedInUser = await loginUser.login(userDetails)
    dispatch(
      {
        type: 'LoggedInUser',
        data: loggedInUser

      }
    )

  }

}
export const noUser = () => {
  return {
    type: 'NO USER',
    data: null
  }
}
export const logout = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  return {
    type: 'LOG OUT',
    data: null
  }
}
export const loggeduser = () => {
  const user = window.localStorage.getItem('loggedBlogAppUser')
  const loggedInUser = JSON.parse(user)
  return {
    type :'LoggedUser',
    loggedInUser
  }
}
export const newUser = () => {
  return{
    type: 'NEW USER',
    data: 'newUser'
  }
}
const reducer = (state = null, action) => {
  switch(action.type){
  case 'LoggedInUser' :
    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify(action.data)
    )
    blogService.setToken(action.data.token)
    return action.data
  case 'LoggedUser' :
    if(action.loggedInUser!== null){
      blogService.setToken(action.loggedInUser.token)
    }
    return action.loggedInUser
  case 'NO USER' :
    return action.data
  case 'NEW USER' :
    return action.data
  case 'LOG OUT' :
    return action.data
  default :
    return state
  }

}

export default reducer