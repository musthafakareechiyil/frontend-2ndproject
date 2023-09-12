import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin: null,
    token: null
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        loggedAdmin:(state,actions) => {
            state.admin = actions.payload.admin
            state.token = actions.payload.token
        },
        adminLogout:(state) =>{
            state.admin = null
            state.token = null
        }
    }
})

export const { loggedAdmin, adminLogout} = adminSlice.actions
export default adminSlice.reducer