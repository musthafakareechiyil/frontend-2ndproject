import { createSlice } from '@reduxjs/toolkit'

const tokenFromLocalStorage = localStorage.getItem('token')
const userFromLocalStorage = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: userFromLocalStorage || null,
    token: tokenFromLocalStorage || null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        currentUser: (state,action) => {
            const { user, token } = action.payload;
            state.user = user
            state.token = token

            localStorage.setItem('token', token)
            // storing user data as json
            localStorage.setItem('user', JSON.stringify(user))
        },
        userLogout: (state) => {
            state.user = null
            state.token = null

            localStorage.removeItem('token');
            localStorage.removeItem('user')
        }
    }
})

export const { currentUser, userLogout } = userSlice.actions

export default userSlice.reducer