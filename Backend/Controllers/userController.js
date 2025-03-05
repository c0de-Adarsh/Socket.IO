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


const logOutUser = async (req , res) =>{

    try {
       
        if(req.user){

            const user = await User.findById(req.user._id);

            if(user){
                user.status = 'offline'
                await user.save()
            }
        }


        //clear cookie

        res.cookie('jwt','',{

            httpOnly:true,
            expires: new Date(0)
        })

        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


 const getUserProfile = async (req , res) => {

    try {
       
        const user = await User.findById(req.user._id).select('-password')

        if(user){
            res.json(user)
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }


 const updateUser = async (req , res) =>{

    try {
       
        const user = await User.findById(req.user._id)

        if(user){

            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.avatar = req.body.avatar || user.avatar;
            user.status = req.body.status || user.status;
        

        if(req.body.password){
            user.password = req.body.password;
        }

        const updateuser = await user.save()

        res.json({
            _id:updateuser._id,
            username:updateuser.username,
            email: updateuser.email,
            avatar: updateuser.avatar,
            status: updateuser.status
        })
    } else {
        res.status(404).json({ message: 'User not found' });
    }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }
module.exports = {registerUser,loginUser,getUserProfile,logOutUser,updateUser}