import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
    },


    updateUserstart:(state)=>{
      state.isFetching=true;
      state.error=false;
    },
    updateUsersuccess:(state,action)=>{
      state.isFetching=false;
      state.users[state.users.findIndex((user)=>user._id===action.payload.id)
      ]=action.payload.user
    },
    updateUserfailure:(state,action)=>{
      state.isFetching=false;
      state.error=true;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure ,logout,updateUserstart,updateUsersuccess,updateUserfailure} = userSlice.actions;
export default userSlice.reducer;