import {configureStore} from '@reduxjs/toolkit' 
import authReducer from './Slice/authSlice'
import messageReducer from './Slice/messageSlice'
import roomReducer from './Slice/roomSlice'

export const store = configureStore({
     reducer:{
        auth: authReducer,
        messages: messageReducer,
        rooms:roomReducer
     },
     devTools:true
})     