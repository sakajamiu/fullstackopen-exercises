
import axios from 'axios'
const baseurl = 'http://localhost:3001/persons'

const getAll = () =>{  
    const request = axios.get(baseurl)
    return request.then(response => response.data)

}
const create = (newPerson) =>{
   const request = axios.post(baseurl, newPerson)
    return request.then(response => response.data)


}
const update = (newPerson, id) =>{
   const request = axios.put(`${baseurl}/${id}`, newPerson)
   return request.then(response => response.data)

}
const deleteData = (id) =>{
    const request =axios.delete(`${baseurl}/${id}`)
    return request.then(response => response.data)
}











export default{getAll, create,update,deleteData}