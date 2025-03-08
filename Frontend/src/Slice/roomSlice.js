import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeRoom:null,
    rooms:[],
    users:[],
    loading: false,
    error: null
}



const roomSlice = createSlice({
     name:'room',
     initialState,
     reducers:{
        setActiveRoom: (state, action) => {
            state.activeRoom = action.payload;
          },
          setRooms: (state, action) => {
            state.rooms = action.payload;
          },
          addRoom: (state, action) => {
            if (!state.rooms.some(room => room.id === action.payload.id)) {
              state.rooms.push(action.payload);
            }
          },
          setUsers: (state, action) => {
            state.users = action.payload;
          },
          clearRoomData: (state) => {
            state.activeRoom = null;
            state.users = [];
          }
     }
})



export const { setActiveRoom, setRooms, addRoom, setUsers, clearRoomData } = roomSlice.actions;

export default roomSlice.reducer;