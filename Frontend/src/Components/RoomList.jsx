import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

const RoomList = ({ rooms, activeRoom }) => {
  // Default rooms if none provided
  const defaultRooms = [
    { id: 'general', name: 'General' },
    { id: 'tech', name: 'Technology' },
    { id: 'random', name: 'Random' }
  ];

  const displayRooms = rooms.length > 0 ? rooms : defaultRooms;

  return (
    <div className="bg-indigo-800 text-white md:w-64 w-36 p-4  md:block">
      <h2 className="md:text-xl text-sm font-bold mb-6">Chat Rooms</h2>
      <ul className="space-y-2">
        {displayRooms.map((room) => (
          <li key={room.id}>
            <Link
              to={`/chat/${room.id}`}
              className={`flex items-center md:text-xl text-sm p-2 rounded-md ${
                activeRoom === room.id
                  ? 'bg-indigo-600'
                  : 'hover:bg-indigo-700'
              }`}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              {room.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;