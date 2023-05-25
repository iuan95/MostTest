import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
    name: "user",
    initialState: {

        email: null,
        firstname: null,
        name: null,
        phone: null,
        token: null,
     
    },
    reducers:{
        adduser: (state, action) =>{
            state.email = action.payload.email
            state.firstname = action.payload.firstname || null
            state.name = action.payload.name || null
            state.phone = action.payload.phone || null
            state.adress = action.payload.adress
            state.token = action.payload.token
        },
    }
})
export const {adduser} = userSlice.actions
export default userSlice.reducer