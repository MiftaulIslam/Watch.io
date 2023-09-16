import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  url: {},
  genres:{}
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
  getapiconfiguration: (state, action)=>{
state.url = action.payload
  },
  getgenres: (state, action)=>{
    state.genres = action.payload
  }
  },
})

// Action creators are generated for each case reducer function
export const {getapiconfiguration, getgenres} = homeSlice.actions

export default homeSlice.reducer