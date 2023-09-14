import { createSlice } from '@reduxjs/toolkit'

const tokenFromLocalStorage = localStorage.getItem('token')

const initialState = {
    user:null,
    token: tokenFromLocalStorage || null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        currentUser: (state,action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        userLogout: (state) => {
            state.user = null
            state.token = null

            localStorage.removeItem('token');
        }
    }
})

export const { currentUser, userLogout } = userSlice.actions

export default userSlice.reducer