import React, { useEffect, useState } from 'react'
import RoomList from '../Components/RoomList'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../Context/SocketContext';
import MessageList from '../Components/MessageList';
import TypingIndicator from '../Components/TypingIndicator';
import MessageInput from '../Components/MessageInput';
import UsersList from '../Components/UserList';
import { setActiveRoom } from '../Slice/roomSlice';
import { getMessage, sendMessage } from '../Slice/messageSlice';

const ChatPage = () => {

  const { roomId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { messages, loading } = useSelector((state) => state.messages);
  const { activeRoom, users } = useSelector((state) => state.rooms);
  const { joinRoom, sendMessage: socketSendMessage } = useSocket();
  const [typingUser, setTypingUser] = useState(null);

  
  

   // Join room when component mounts or room changes
   useEffect(() => {
    if (user && roomId) {
      dispatch(setActiveRoom(roomId));
      
      // Join the room via socket
      joinRoom({
        userId: user._id,
        username: user.username,
        room: roomId
      });
      
      // Fetch messages for this room
      dispatch(getMessage(roomId));
    }
  }, [dispatch, user, roomId, joinRoom]);

  // Listen for typing events
  useEffect(() => {
    const socket = window.socket;
    
    if (socket) {
      socket.on('userTyping', ({ username, isTyping }) => {
        if (isTyping) {
          setTypingUser(username);
        } else {
          setTypingUser(null);
        }
      });
    }
    
    return () => {
      if (socket) {
        socket.off('userTyping');
      }
    };
  }, []);


  
  const handleSendMessage = (content) => {
    if (user && roomId) {
      // Send message via socket
      socketSendMessage(content, () => {
        // Also save to database via API
        dispatch(sendMessage({ content, room: roomId }));
      });
    }
  };
  return (
   <>
   <div className='flex h-[calc(100vh-80px)] bg-white rounded-lg shadow-lg overflow-hidden'>
     
     <RoomList rooms={[]} activeRoom={activeRoom}/>


     <div className='flex flex-col flex-1'>
      <div className="bg-white border-b border-gray-200 p-4">
        <h2 className='text-xl font-semibold'>
          #{roomId}
        </h2>
      </div>


        {/* message */}

        {
          loading ? (
            <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
          ) : (
            <MessageList messages={messages} />
          )
        }


        {/* Typing Indicator */}
        <TypingIndicator username={typingUser} />


         {/* Message Input */}
         <MessageInput onSendMessage={handleSendMessage} />
     </div>


      {/* Users List - Right Sidebar */}
      <UsersList users={users} />
   </div>
   </>
  )
}

export default ChatPage