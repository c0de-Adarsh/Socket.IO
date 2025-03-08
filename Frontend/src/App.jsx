import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './Components/Header'
import Register from './Pages/Register'
import Login from './Pages/Login'
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
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>

    </Routes>
     </main>
    </BrowserRouter>
  </div>
  </>
  )
}

export default App