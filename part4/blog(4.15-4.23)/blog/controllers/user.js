const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (request,response) => {
    const body = request.body
    const saltRounds = 10
    if(body.password.length < 4){
        return response.status(400).json({
            error : 'password is too short'
        })
    }
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name : body.name,
        passwordHash : passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

userRouter.get('/', async (request,response) => {
    const Users = await User.find({}).populate('blogs',{title: 1, url : 1, author: 1})
    response.json(Users)
})



module.exports = userRouter