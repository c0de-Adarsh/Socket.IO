import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './Components/Header'
const App = () => {
  return (
  <>
  
  <div>
    <BrowserRouter>
    <div className='min-h-screen bg-gray-100'>
      <Header />
    </div>
     <main>
     <Routes>
      <Route/>


    </Routes>
     </main>
    </BrowserRouter>
  </div>
  </>
  )
}

export default App