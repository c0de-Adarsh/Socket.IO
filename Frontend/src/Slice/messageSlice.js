import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../Utils";
import axios from "axios";


const initialState = {
    messages: [],
    loading: false,
    error: null
  };



  export const getMessage = createAsyncThunk(
    'message/getMessages',
    async (roomId, { rejectWithValue }) => {
        try {
           

            const { data } = await axios.get(`${API}/${roomId}`, {
                withCredentials: true
            });

            return data;
        } catch (error) {
          
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch messages');
        }
    }
);


 export const sendMessage = createAsyncThunk(
    'messages/sendMessage',
    async ({ content, room }, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(`${API}/`, { content, room }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });

        console.log('create data',data)
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to send message');
      }
    }
  );



   
  export const markMessagesAsRead = createAsyncThunk(
    'messages/markMessagesAsRead',
    async (messageIds, { rejectWithValue }) => {
      try {
        await axios.put(`${API}/read`, { messageIds }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        return messageIds;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to mark messages as read');
      }
    }
  );


const messageSlice = createSlice({
    name:'message',
    initialState,
    reducers: {
        addMessage: (state, action) => {
          state.messages.push(action.payload);
        },
        clearMessages: (state) => {
          state.messages = [];
        }
      },

      extraReducers: (builder) => {
        builder
          // Get messages
          .addCase(getMessage.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.messages = action.payload;
          })
          .addCase(getMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          // Send message
          .addCase(sendMessage.fulfilled, (state, action) => {
            state.messages.push(action.payload);
          })
          // Mark messages as read
          .addCase(markMessagesAsRead.fulfilled, (state, action) => {
            const messageIds = action.payload;
            state.messages = state.messages.map(message => {
              if (messageIds.includes(message._id)) {
                return {
                  ...message,
                  readBy: [...message.readBy, 'currentUserId'] // This should be replaced with actual user ID
                };
              }
              return message;
            });
          });
      }
})


export const { addMessage, clearMessages } = messageSlice.actions;

export default messageSlice.reducer;