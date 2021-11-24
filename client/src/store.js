import { configureStore } from '@reduxjs/toolkit'
import viewportSlice from './features/viewportSlice'

export default configureStore({
  reducer: {
    viewport: viewportSlice,
  },
})
