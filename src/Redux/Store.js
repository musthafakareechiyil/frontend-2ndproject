import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

const store = configureStore({
    reducer:{
        userStore: userReducer
    }
})

export default store