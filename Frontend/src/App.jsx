import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './Components/Header'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import HomePage from './Pages/HomePages'
import ChatPage from './Pages/ChatPage'
import PrivateRoute from './Components/PrivateRoute'
const App = () => {
  return (
  <>
  
  <div>
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
    </Routes>
     </main>
    </BrowserRouter>
  </div>
  </>
  )
}

export default App