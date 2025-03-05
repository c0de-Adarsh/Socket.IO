const { generateToken } = require('../jwt')
const User = require('../Models/userModel')
const bcrypt = require('bcrypt')
require('dotenv').config()


const registerUser = async(req, res) =>{

    try {
       
        const {username , email , password} = req.body

        const userExist = await User.findOne({ $or: [{email} , {username}] })

        if(userExist){
            return res.status(400).json({
                message:'User Already Exist',
                success:false
            })
        }


        const user = await User.create({
            username,
            email,
            password
        })

        if(user){

            const token = generateToken(user._id)

            res.cookie('jwt', token, {

                httpOnly:true,
                secure: process.env.NODE_ENV = 'development',
                sameSite:'Strict',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days

                
            })


            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                status: user.status,
                token
              });
        }  else {
            res.status(400).json({ message: 'Invalid user data' });
          }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const loginUser = async(req, res) => {
    
    try {
       
   const {email , password} = req.body
       
   const user = await User.findOne({email})

   if(!user){
    return res.status(401).json({
        message:'User Not Found',
        success:false
    })
   }

    const isMatched = await bcrypt.compare(password,user.password)

    if(!isMatched){
        return res.status(400).json({
            message:'Incorrect Password',
            success:false
        })
    }

    user.status = 'online';

    await user.save()

    const token = generateToken(user._id)

    res.cookie('jwt',token,{
        
        httpOnly:true,
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    }) 

    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        status: user.status,
        token
      });
      
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}

module.exports = {registerUser,loginUser}