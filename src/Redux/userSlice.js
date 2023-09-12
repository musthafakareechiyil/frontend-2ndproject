import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user:null,
    token:null
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
        }
    }
})

export const { currentUser, userLogout } = userSlice.actions

export default userSlice.reducer