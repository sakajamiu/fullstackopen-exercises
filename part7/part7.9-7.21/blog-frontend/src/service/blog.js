import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data

}
const create = async(newObject) => {
  const config ={
    headers: { Authorization: token },
  }


  const response = await axios.post(baseUrl, newObject, config)
  return response.data

}
const update = async(newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return response.data
}
const comment = async(newObject) => {
  const response = await axios.post(`${baseUrl}/${newObject.id}/comments`, newObject)
  return response.data
}
const remove = async id => {
  const config ={
    headers: { Authorization: token },
  }
  console.log(id)
  console.log(config)
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
  comment
}