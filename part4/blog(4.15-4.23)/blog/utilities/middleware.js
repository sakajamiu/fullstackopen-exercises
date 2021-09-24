require('dotenv').config()
const request = require('superagent')
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const requestLogger = (request,response,next) => {
    logger.info('Method', request.method)
    logger.info('Path',request.path)
    logger.info('Body', request.body)
    logger.info('----')
    next()
}

const tokenExtractor = (request,response,next ) =>{
    const getAuthorization = request.get('authorization')
    if(getAuthorization && getAuthorization.toLowerCase().startsWith('bearer ')){
        request.token = getAuthorization.substring(7)

    }else{
        request.token =  null
    }
    next()

}
const userExtractor = async (request, response, next) => {
   const token = request.token
   const decodedToken = jwt.verify(token, process.env.SECRET)
   if(!token || !decodedToken){
       response.status(401).json({
           error: 'missing or invalid token'
       })
   }
   const user = await User.findById(decodedToken.id)
   request.user = user
   next()

}
const unknownEndPoint = (request,response) => {
    response.status(404).send({error: 'unknown Endpoint'})
}

const errorHandler = (error,request,response,next) => {
   
 
    if(error.name === 'CastError'){
        return response.status(400).send({error: 'malformated ID'})
    }
    else if( error.name === 'ValidationError'){
        return response.status(400).json({error : error.message})
    }
    logger.error(error.message)

    next(error)

   
}

module.exports = {
    requestLogger,
    unknownEndPoint,
    errorHandler,
    tokenExtractor,
    userExtractor

}