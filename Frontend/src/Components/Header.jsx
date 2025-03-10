import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {LogOut, MessageSquare, User} from 'lucide-react'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../Slice/authSlice'
const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=> state.auth)
 

  const handleLogout = () =>{
        dispatch(logout())
        navigate('/login')
  }
  return (
    <header className='bg-white shadow-md'>
     <div  className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center pr-6">
        <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center">
            <MessageSquare className="mr-2" />
            RealChat
          </Link>
          <nav>

            <ul className='flex space-x-6'>
            {
              user ? (
                <>
                <li>
                    <Link to="/profile" className="text-gray-700 hover:text-indigo-600 flex items-center">
                      <User className="w-5 h-5 mr-1" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-indigo-600 flex items-center"
                    >
                      <LogOut className="w-5 h-5 mr-1" />
                      Logout
                    </button>
                  </li>
                
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="text-white hover:text-white rounded-md bg-indigo-600 py-2 px-4">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="text-white hover:text-white bg-indigo-600 rounded-md py-2 px-4">
                      Register
                    </Link>
                  </li>
                </>
              )
            }
            </ul>
          </nav>
        </div>
     </div>
    </header>
  )
}

export default Header