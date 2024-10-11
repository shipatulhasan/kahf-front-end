import { configureStore } from '@reduxjs/toolkit'
import profile from '../features/profileSlice'

export const store = configureStore({
  reducer: {
    profile: profile,
 
  }
})