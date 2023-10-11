import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import adiminReducer from './adiminSlice'
import feedReducer from './feedSlice'

const store = configureStore({
    reducer:{
        userDetails: userReducer,
        adminDetails: adiminReducer,
        feedData: feedReducer
    }
})

export default store