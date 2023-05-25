import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
    name: "user",
    initialState: {

        email: null,
        firstname: null,
        name: null,
        phone: null,
        token: null,
        refToken: null,
     
    },
    reducers:{
        adduser: (state, action) =>{
            state.email = action.payload.email
            state.firstname = action.payload.firstname
            state.name = action.payload.name 
            state.phone = action.payload.phone 
            state.adress = action.payload.adress 
            state.token = action.payload.token  
        },
    }
})
export const {adduser} = userSlice.actions
export default userSlice.reducer