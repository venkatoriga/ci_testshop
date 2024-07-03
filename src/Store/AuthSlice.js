import { createSlice } from "@reduxjs/toolkit"

let isLoggedIn= !!localStorage.getItem('token');

const initialState={
    isAuth:isLoggedIn
}

const AuthSlice=createSlice({
  name:'Authentication',
  initialState:initialState,
  reducers:{
  

  }  
})
export const AuthSliceAction=AuthSlice.actions;
export default AuthSlice.reducer;