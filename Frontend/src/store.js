import {configureStore} from '@reduxjs/toolkit' 
import authReducer from './Slice/authSlice'
import messageReducer from './Slice/messageSlice'


export const store = configureStore({
     reducer:{
        auth: authReducer,
        message: messageReducer
     },
     devTools:true
})