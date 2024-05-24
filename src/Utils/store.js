import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../Reducers/user"

export default configureStore({
  reducer: {
    user: userReducer,
  },
})