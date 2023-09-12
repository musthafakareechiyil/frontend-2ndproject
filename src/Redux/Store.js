import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import adiminReducer from './adiminSlice'

const store = configureStore({
    reducer:{
        userDetails: userReducer,
        adminDetails: adiminReducer
    }
})

export default store