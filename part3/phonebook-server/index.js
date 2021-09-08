const { response, request } = require('express')
const express = require('express')
app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
require('dotenv').config()
const Contact = require('./model/contact')
const morgan = require('morgan')
morgan.token('requestData',(request,response) => { return JSON.stringify(request.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestData',{
    skip: function(req,res){ return req.method !='POST' }
}))


app.get('/api/persons',(request,response, next) => {
    Contact.find({})
     .then(person => response.json(person))
     .catch(error => next(error))
    
})

app.get('/api/persons/info', (request,response,next)=>{
    Contact.estimatedDocumentCount()
    .then(count => {
        const info ={
            count : ` the database has ${count} contact`,
             date : Date()
        }
        response.status(200).send( info)
    })
    .catch( error => next(error))

    
})

app.get('/api/persons/:id', (request,response, next) =>{
    Contact.findById(request.params.id)
     .then(person => {
        if(person){
            response.json(person)
        }else{
            response.status(404).send('the resources is not availble').end()
        }
       
     })
     .catch(error => next(error))

})

app.delete('/api/persons/:id', (request,response, next)=>{
    Contact.findByIdAndRemove(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))

})

app.post('/api/persons',(request,response,next)=>{
     let body = request.body
     if(!body){
         response.status(400).json({
            "error": "missing content"
         })
     }else if(!body.name || !body.phone ){
         response.status(400).json({
            "error":"name or number is null "
        })

     }
    const contact = new Contact({
        name : body.name,
        phone: body.phone,
    })

    contact.save().then(returnedPerson =>{
        response.json(returnedPerson)
    }).catch(error => next(error) )

})




app.put('/api/persons/:id',(request,response,next)=>{
    const body = request.body

    const contact = {
        name: body.name,
        phone : body.phone,
    }
    Contact.findByIdAndUpdate(request.params.id, contact, {new: true, runValidators:true, context:'query'})
     .then(updatedcontact =>
        response.json(updatedcontact)
     )
     .catch(error => next(error))

})



const unkownEndpoint = (request,response)=>{
    response.status(404).send({ error: 'unkown endpoint'})
}

app.use(unkownEndpoint)

const errorHandler = (error, request, response, next)=>{
    console.error(error.message)
    response.status(400).send(error.message)

    if(error.name === 'CastError'){
        response.status(400).send({error: 'malformatted id'})
    }
    next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT,() => { console.log(`app running at ${PORT}`)})