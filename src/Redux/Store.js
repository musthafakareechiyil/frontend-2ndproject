import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import adiminReducer from './adiminSlice'
import feedReducer from './feedSlice'
import chatSlice from './chatSlice'

const store = configureStore({
    reducer:{
        userDetails: userReducer,
        adminDetails: adiminReducer,
        feedData: feedReducer,
        chat: chatSlice,
    }
})

export default store