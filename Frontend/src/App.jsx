import React, { useEffect } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './Components/Header'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import HomePage from './Pages/HomePages'
import ChatPage from './Pages/ChatPage'
import PrivateRoute from './Components/PrivateRoute'
import { SocketProvider } from './Context/SocketContext'
import NotFoundPage from './Pages/NotFoundPage'
import { getUserProfile } from './Slice/authSlice'
import { useDispatch } from 'react-redux'
const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserProfile());  
  }, [dispatch]);

  return (
  <>
  
  <div>
    <SocketProvider>
    <BrowserRouter>
    <div>
      <Header />
    </div>
     <main  className="container mx-auto px-4 py-8">
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/chat/:roomId' element={
        <PrivateRoute>
          <ChatPage />
        </PrivateRoute>
      }/>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
     </main>
    </BrowserRouter>
    </SocketProvider>
  </div>
  </>
  )
}

export default App