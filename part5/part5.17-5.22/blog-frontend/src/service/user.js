import axios from 'axios'

const baseUrl = '/api/users'

const register = async User => {
  const response= await axios.post(baseUrl, User)
  return response.data
}

export default { register }