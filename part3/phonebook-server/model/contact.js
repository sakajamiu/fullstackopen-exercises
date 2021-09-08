const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Url = process.env.MONGODB_URL

console.log ('connecting to :', Url)
mongoose.connect(Url).then(result => 
    console.log('connected to MongoDB')
).catch(err =>{
    console.log(err.message)

})

const phonebookSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength: 5,
        required: true,
        unique: true

    },
    phone:{
        type: String,
        minlength: 8,
        required: true,
    }    
})
phonebookSchema.plugin(uniqueValidator)
phonebookSchema.set('toJSON', {
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Contact', phonebookSchema)