const express = require('express')
const { registerUser, loginUser, logOutUser, getUserProfile, updateUser } = require('../Controllers/userController')
const { jwtAuthMiddleware } = require('../jwt')
const { getMessage, createMessage, markMessageAsRead } = require('../Controllers/messageController')

const router = express.Router()


//user route 
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(jwtAuthMiddleware,logOutUser)
router.route('/profile').get(jwtAuthMiddleware,getUserProfile)
router.route('/profile').put(jwtAuthMiddleware,updateUser)


//message route

 router.route('/:room').get(jwtAuthMiddleware,getMessage)
 router.route('/').post(jwtAuthMiddleware,createMessage)
 router.route('/read').put(jwtAuthMiddleware,markMessageAsRead)

module.exports = router