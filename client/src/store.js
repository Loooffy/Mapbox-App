import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import viewportSlice from './features/viewportSlice'

export default configureStore({
  reducer: {
    viewport: viewportSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})
