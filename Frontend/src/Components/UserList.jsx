import React from 'react';
import { Circle } from 'lucide-react';

const UsersList = ({ users }) => {

  
  return (
    <div className="bg-gray-50 border-l border-gray-200 p-4 w-64  md:block">
      <h3 className="md:text-lg font-semibold text-xs mb-4">Users in Room ({users.length})</h3>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="flex items-center">
            <Circle className="w-3 h-3 text-green-500 mr-2" fill="currentColor" />
            <span className="text-gray-800">{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;