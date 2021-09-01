const { response, request } = require('express')
const express = require('express')
app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const morgan = require('morgan')
morgan.token('requestData',(request,response) => { return JSON.stringify(request.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestData',{
    skip: function(req,res){ return req.method !='POST' }
}))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "phone": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "phone": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "phone": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "phone": "39-23-6423122"
    }
]
app.get('/',(request,response)=>{
    response.send('<h1>i am working</h1>')
})
app.get('/api/persons',(request,response) => {
    response.json(persons)
})
app.get('/api/persons/info',(request,response) =>{
    response.send(`<h4>phonebook has info for ${persons.length} people</h4>
                    ${new Date()}`)

})
app.get('/api/persons/:id', (request,response) =>{
    let id = Number(request.params.id)

    const person = persons.find(person => person.id === id)
    
if(person){
    response.json(person)
}else{
    response.status(404).send('the resources is not availble').end()
}

})

app.delete('/api/persons/:id', (request,response)=>{
    let id = Number(request.params.id)
    persons = persons.filter(person=> person.id !== id)

    response.status(204).end()
})
app.post('/api/persons',(request,response)=>{
     let body = request.body
     if(!body){
         response.status(400).json({
             "error": "missing content"
         })
     }else if(!body.name || !body.phone ){
         response.status(400).json({
             "error":"name or number is null "
         })

     }else if (persons.some(person => person.name.toLowerCase() === body.name.toLowerCase())){
         response.status(400).json({
             "error":"name must be unique"
         })
     }
     let id = Math.floor(Math.random() * 10000)
     const person =  {
         id: id,
         name: body.name,
         phone: body.phone
     }
    persons = persons.concat(person)
     response.json(person)
})

const unkownEndpoint = (request,response)=>{
    response.status(404).send({ error: 'unkown endpoint'})
}
app.use(unkownEndpoint)


const PORT = process.env.PORT||3001
app.listen(PORT,() =>{
    console.log(`app running at ${PORT}`)
})