import React from 'react'
import { Link } from 'react-router-dom'
import {MessageSquare} from 'lucide-react'
const Header = () => {
  return (
    <header className='bg-white shadow-md'>
     <div>
        <div>
        <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center">
            <MessageSquare className="mr-2" />
            RealChat
          </Link>
          <nav>

            <ul className='flex space-x-6'>

            </ul>
          </nav>
        </div>
     </div>
    </header>
  )
}

export default Header