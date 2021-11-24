import { createSlice } from '@reduxjs/toolkit'
import { LinearInterpolator } from 'react-map-gl';

export const viewportSlice = createSlice({
  name: 'viewport',
  initialState: {
    latitude: 25,
    longitude: 121.5,
    zoom: 12,
  },
  reducers: {
    update: (state, action) => {
      if (action.payload.isClick) {
        return {
          ...action.payload,
          transitionDuration: 300,
          transitionInterpolator: new LinearInterpolator(),
        };
      } else {
        return action.payload;
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { update } = viewportSlice.actions;

export default viewportSlice.reducer;
