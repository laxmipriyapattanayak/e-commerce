import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { getUserProfileDetails } from 'services/UserService';

export const getUserProfile: any = createAsyncThunk( "api/users/profile", async (id: string) => {
    const res =  await getUserProfileDetails(id);
    return res;
})

const getLocalStoreItem = () => {
  const loginStatus = localStorage.getItem("loginStatus")
  if (loginStatus === null) {
    return false;
  } else {
    return JSON.parse(loginStatus);
  }
};

const initialState = {
  userProfile: {},
  isLoggedIn: false,
  isAdmin: false
} as any

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {   
    login: (state) => {
      localStorage.setItem("userId", state?.userProfile?.id);
    },
    logout: (state) => {
      state.userProfile = {}
      state.isLoggedIn = false
      state.isAdmin = false
    }
  },
  extraReducers:(builder)=> {
    
    builder.addCase(getUserProfile.fulfilled,(state, action: {payload: any})=>{
        state.userProfile = action.payload
        state.isLoggedIn = true
        
        if(action.payload?.user?.is_admin) {
          state.isAdmin = true;
        }
    });
    
    builder.addCase(getUserProfile.pending,(state, action: {payload: any})=>{
        state.userProfile = {}
    });
    
    builder.addCase(getUserProfile.rejected,(state, action: {payload: any})=>{
        state.userProfile = {}
    });
  }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer