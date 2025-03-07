import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import API from '../Utils/index'


const initialState = {
    user: null,
    loading:false,
    error:null
}


export const register = createAsyncThunk(
  'auth/register',

  async (userData , {rejectWithValue}) => {

    try {
      

      const {data} = await axios.post(`${API}/register`,userData,{

        headers:{
          'Content-Type': 'application/json'
        },
        withCredentials:true
      });
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
)




export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API}/login`, userData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
)



export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API}/logout`, {}, {
        withCredentials: true
      });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);



export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/profile`, {
        withCredentials: true
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get user profile');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API}/profile`, userData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
)


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
          },
          clearCredentials: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
          },
          setError: (state, action) => {
            state.error = action.payload;
          },
          clearError: (state) => {
            state.error = null;
          }
    },


    extraReducers: (builder) => {
        builder
          // Register
          .addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
          })
          .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          // Login
          .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
          })
          .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          // Logout
          .addCase(logout.fulfilled, (state) => {
            state.user = null;
          })
          // Get profile
          .addCase(getUserProfile.pending, (state) => {
            state.loading = true;
          })
          .addCase(getUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
          })
          .addCase(getUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          // Update profile
          .addCase(updateUserProfile.pending, (state) => {
            state.loading = true;
          })
          .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
          })
          .addCase(updateUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      }
})


export const {setCredentials , clearCredentials, setError , clearError} = authSlice.actions;

export default authSlice.reducer