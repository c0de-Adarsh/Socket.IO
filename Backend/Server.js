const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')
const http = require('http')
const {Server} = require('socket.io')
const cookieParser = require('cookie-parser');
const router = require('./Routes/Route')
const {socketHandler} = require('./socketHandler.js')

const PORT = process.env.PORT || 5000

app.use(express.json({ limit: "10mb" })); 
app.use(cookieParser())
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
})) 
 app.use(router)


 const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

socketHandler(io);


app.get('/h',( req , res)=>{
    res.send('Hello world')
})

server.listen(PORT,()=>{
    console.log(`Server is Up and Listing on ${PORT}`)
})