import { UserPlus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearError, register } from '../Slice/authSlice';

const Register = () => {


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formError, setFormError] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.auth);

    useEffect(() => {
        // Clear any previous errors
        dispatch(clearError());
        
        // Redirect if already logged in
        if (user) {
          navigate('/');
        }
      }, [dispatch, navigate, user]);

      const handleSubmit = (e) => {
        e.preventDefault();
        setFormError('');
        
        // Validate passwords match
        if (password !== confirmPassword) {
          setFormError('Passwords do not match');
          return;
        }
        
        // Validate password length
        if (password.length < 6) {
          setFormError('Password must be at least 6 characters');
          return;
        }
        
        dispatch(register({ username, email, password }));
      };
  return (
   <>
   <div className='max-w-md mx-auto rounded-lg bg-white shadow-md overflow-hidden'>

    
    <div className="bg-indigo-600 py-4 px-6">
    <h2 className="text-2xl font-bold text-white flex items-center">
          <UserPlus className="mr-2" />
          Create an Account
        </h2>
    </div>



    <div className='p-6'>
    {(error || formError) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {formError || error}
          </div>
        )}



        <form action="" onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>




          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>



          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          


          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>



          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>



        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
    </div>
   
   
   
   </div>
   </>
  )
}

export default Register