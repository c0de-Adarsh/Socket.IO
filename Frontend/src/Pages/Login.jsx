import { LogIn } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearError, login } from '../Slice/authSlice';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.auth);

     useEffect(()=>{

        dispatch(clearError())

        //if user already login
        if(user){
            navigate('/')
        }
     },[dispatch,navigate,user])

    const handleSubmit = (e) => {
      e.preventDefault()
         dispatch(login({email,password}))
    }
  return (
    <>
    <div className='max-w-md bg-white rounded-lg shadow-md overflow-hidden mx-auto'>
      



      <div className='bg-indigo-600 px-6 py-4'>
        <h2 className='text-2xl text-white font-bold flex items-center'>
        <LogIn className="mr-2" />
        Login to RealChat
        </h2>
      </div>



      <div className='p-6'>
      {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}


        <form action="email" onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="email"  className='text-gray-700 block font-medium mb-2'>Email Adress</label>
            <input type="email" id='email' value={email} onChange={(e)=> setEmail(e.target.value)} className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
          </div>


          <div className='mb-6'>
            <label htmlFor="password" className='text-gray-700 block font-medium mb-2'>Password</label>
            <input type="password" id='password' onChange={(e)=> setPassword(e.target.value)} className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
          </div>


          <button  type="submit"
            disabled={loading} className='bg-indigo-600 w-full text-white py-2 px-4 font-medium rounded-lg  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50'>
            {loading ? 'Logging in': 'Login'}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login