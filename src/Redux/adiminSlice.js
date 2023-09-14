import { createSlice } from "@reduxjs/toolkit";

const adminTokenFromLocalStorage = localStorage.getItem('adminToken')

const initialState = {
    admin: null,
    token: adminTokenFromLocalStorage || null
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        loggedAdmin:(state,actions) => {
            state.admin = actions.payload.admin
            state.token = actions.payload.token

            localStorage.setItem('adminToken', actions.payload.token)
        },
        adminLogout:(state) =>{
            state.admin = null
            state.token = null

            localStorage.removeItem('adminToken')
        }
    }
})

export const { loggedAdmin, adminLogout} = adminSlice.actions
export default adminSlice.reducer