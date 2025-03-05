const express = require('express')
const { registerUser, loginUser, logOutUser, getUserProfile, updateUser } = require('../Controllers/userController')
const { jwtAuthMiddleware } = require('../jwt')

const router = express.Router()


//user route 
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(jwtAuthMiddleware,logOutUser)
router.route('/profile').get(jwtAuthMiddleware,getUserProfile)
router.route('/profile').put(jwtAuthMiddleware,updateUser)


module.exports = router