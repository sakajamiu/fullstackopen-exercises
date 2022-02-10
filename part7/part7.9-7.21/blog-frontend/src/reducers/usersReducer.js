import users from '../service/user'

export const Users = () => {
  return async dispatch => {
    const RegisteredUsers = await users.getAll()
    dispatch(
      {
        type: 'USER INITIALIZE',
        Users: RegisteredUsers
      }
    )

  }
}
export const Register = (userDetails) => {
  return async dispatch => {
    const user = await users.register(userDetails)
    dispatch({
      type: 'Register',
      data : user
    })

  }
}

const reducer = (state =[], action) => {
  switch(action.type) {
  case 'USER INITIALIZE':
    return action.Users
  case 'Register':
    return action.data
  default:
    return state
  }
}

export default reducer