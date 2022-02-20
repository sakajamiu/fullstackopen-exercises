const mongoose = require('mongoose')


const password = process.argv[2]
const name = process.argv[3]
const phone = process.argv[4]
const url = 
 `mongodb+srv://phone_book_project:${password}@cluster0.6hvdh.mongodb.net/phonebook-app?retryWrites=true&w=majority`



const contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,

})

const Contact = mongoose.model('Contact', contactSchema)
mongoose.connect(url)
if (process.argv.length === 3){
    Contact.find({}).then(result =>{
        result.forEach(contact =>{
            console.log(contact)
            mongoose.connection.close()
        })
    })
    
    
}else{
const contact = new Contact({
    name : name,
    phone: phone,
})

contact.save().then(result =>{
    console.log(`added ${name} number ${phone} to phonebook`)
    mongoose.connection.close()
})
}


