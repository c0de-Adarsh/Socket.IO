const mongoose = require('mongoose')
require('dotenv').config()

const MongoUrl = process.env.MONGO_URL

mongoose.connect(MongoUrl,{
    useUnifiedTopology:true,
    useNewUrlParser:true

})

const db = mongoose.connection

db.on('connected',()=>{
    console.log('MongoDB connected Successfuly!')
})

db.on('disconnected',()=>{
 console.log('MongoDB Disconnected Successfuly!')
})

db.on('error',(err)=>{
    console.log('MongoDB Connection Error',err)
})


module.exports = db