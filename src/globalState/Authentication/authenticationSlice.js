import { createSlice } from '@reduxjs/toolkit'

export const authenticationSlice = createSlice({
  name: 'isAuthenticated',
  initialState :{
    value:false
  },
  
  reducers: {
   
    updateIsAuthenticated: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {updateIsAuthenticated} = authenticationSlice.actions

export default authenticationSlice.reducer