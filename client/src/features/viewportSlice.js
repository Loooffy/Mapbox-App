import { createSlice } from '@reduxjs/toolkit'

export const viewportSlice = createSlice({
  name: 'viewport',
  initialState: {
    latitude: 25,
    longitude: 121.5,
    zoom: 12,
  },
  reducers: {
    update: (state, action) => {
      return action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { update } = viewportSlice.actions;

export default viewportSlice.reducer;
