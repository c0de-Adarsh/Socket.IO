import { User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../Slice/authSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [status, setStatus] = useState('online');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch latest user data
        dispatch(getUserProfile());
      }, [dispatch]);
      

      useEffect(() => {
        if (user) {
          setUsername(user.username || '');
          setEmail(user.email || '');
          setAvatar(user.avatar || '');
          setStatus(user.status || 'online');
        }
      }, [user]);


      const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        
        // Validate passwords match if changing password
        if (password && password !== confirmPassword) {
          setMessage('Passwords do not match');
          return;
        }
        
        const userData = {
          username,
          email,
          status
        };
        
        if (avatar) {
          userData.avatar = avatar;
        }
        
        if (password) {
          userData.password = password;
        }
        
        dispatch(updateUserProfile(userData))
          .then(() => {
            setMessage('Profile updated successfully');
            setPassword('');
            setConfirmPassword('');
          });
      };
      
      if (!user) {
        return <div>Loading profile...</div>;
      }

    return (
        <>
            <div className='max-w-md bg-white mx-auto shadow-md overflow-hidden rounded-lg'>
                <div className='bg-indigo-600 py-4 px-6'>
                    <h2 className='text-2xl font-bold text-white flex items-center'>
                        <User className='mr-2' />
                        Your Profile
                    </h2>
                </div>



                <div className='p-6'>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}




                    {message && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            {message}
                        </div>
                    )}




                    <form action="" onSubmit={handleSubmit}>

                        <div className='mb-4'>

                            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='w-full border border-gray-300 rounded-lg px-4 py-2 outline-none  focus:outline-none focus:ring-2 focus:ring-indigo-500' />
                        </div>



                        <div className='mb-4'>

                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Adress</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:outline-none focus:ring-2 focus:ring-indigo-500 ' />
                        </div>



                        <div className='mb-4'>

                            <label htmlFor="avatar" className="block text-gray-700 font-medium mb-2">Avatar URL (optional)</label>

                            <input type="url" id='avatar' value={avatar} onChange={(e) => setAvatar(e.target.value)} className='w-full outline-none border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ' />
                        </div>



                        <div className='mb-4'>
                            <label htmlFor="status" className="block text-gray-700 font-medium mb-2">Status</label>

                            <select name="" id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="online">Online</option>
                                <option value="away">Away</option>
                                <option value="offline">Offline</option>
                            </select>
                        </div>


                        <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              New Password (leave blank to keep current)
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>



                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <button type='submit' disabled={loading}  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 flex items-center justify-center">
                            {loading ? 'Saving...': 'Save Changes'}
                        </button>
                    </form>


                </div>
            </div>
        </>
    )
}

export default Profile