import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
    name: "user",
    initialState: {

        email: null,
        surname: null,
        name: null,
        phone: null,
        age: null,
        token: null,
        refToken: null,
     
    },
    reducers:{
        adduser: (state, action) =>{
            state.email = action.payload.email
            state.surname = action.payload.surname 
            state.name = action.payload.name
            state.phone = action.payload.phone 
            state.age = action.payload.age
            state.refToken = action.payload.refToken 
            state.token = action.payload.token  
        },
        edituser: (state, action) =>{
            state.surname = action.payload.surname 
            state.name = action.payload.name
            state.phone = action.payload.phone 
            state.age = action.payload.age
        },
        logout: (state) =>{
            state.email = null
        }
    }
})
export const {adduser, edituser, logout} = userSlice.actions
export default userSlice.reducer