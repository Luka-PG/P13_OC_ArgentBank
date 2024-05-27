import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../Reducers/user"

//mise en place du store avec le selecteur de l'utilisateur
export default configureStore({
  reducer: {
    user: userReducer,
  },
})