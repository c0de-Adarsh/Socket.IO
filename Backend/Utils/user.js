const users = [];

 const addUser = ({ id , userId ,username , room}) => {

    if(!username || !room){
        return {
            error:'username and room are required'
        }
    }

    username = username.trim()
    room = room.trim()


    //check if user exits

    const exitsUser = users.find((user)=>
         

        //user same room hai ya nahi aur user same h ya ni
          user.room === room && user.username === username
    )

    if(exitsUser){
        return {
            error:'Username Already Taken In This Room'
        }
    }

    const user = { id, userId, username, room };
  users.push(user);
  
  return { user };
}

 const removeUser = (id) => {
 
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      return users.splice(index, 1)[0];
    }

}

 const getUser = (id) => {
    return users.find((user) => user.id === id);
  };

   const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
  };

  module.exports = {addUser , removeUser, getUser,getUsersInRoom}