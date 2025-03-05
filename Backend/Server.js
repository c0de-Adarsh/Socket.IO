const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')
const router = require('./Routes/Route')

const PORT = process.env.PORT || 5000

app.use(express.json({ limit: "10mb" })); 
 app.use(router)
app.get('/',( req , res)=>{
    res.send('Hello world')
})

app.listen(PORT,()=>{
    console.log(`Server is Up and Listing on ${PORT}`)
})