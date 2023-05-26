import { createSlice } from '@reduxjs/toolkit'

export const itemsSlice = createSlice({
    name: "items",
    initialState: {
        data: []
    },
    reducers:{
        add: (state, action) =>{
            state.data = action.payload
        },
        addone: (state) =>{
            state.data += 1
        }
    }

})
export default itemsSlice.reducer
export const {add, addone} = itemsSlice.actions

