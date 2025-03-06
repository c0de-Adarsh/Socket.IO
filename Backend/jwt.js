const jwt = require('jsonwebtoken')
const User = require('./Models/userModel')
require('dotenv').config()



const generateToken = (userData) => {

    try {
       
        const payload = {
            userId: userData._id,
            email: userData.email
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'5d'})

        return token
    } catch (error) {
        console.log('Error while creating token',error)
    }
}


const jwtAuthMiddleware = async( req , res, next) => {
  
    let token;

    if(req.cookies.jwt){
        token = req.cookies.jwt
    }

    else if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        token = req.headers.authorization.split(' ')[1];
    }


    if(!token){
        return res.status(401).json({
            message:'Token Not Found'
        })
    }


    try {
       
        // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
     req.user = await User.findById(decoded.userId).select('-password')
     

     if(!req.user){
        return res.status(404).json({message:'User Not Found'})
     }

     next()
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
}


module.exports = {jwtAuthMiddleware,generateToken}