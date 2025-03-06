const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')
const cookieParser = require('cookie-parser');
const router = require('./Routes/Route')

const PORT = process.env.PORT || 5000

app.use(express.json({ limit: "10mb" })); 
app.use(cookieParser())
 app.use(router)
app.get('/h',( req , res)=>{
    res.send('Hello world')
})

app.listen(PORT,()=>{
    console.log(`Server is Up and Listing on ${PORT}`)
})