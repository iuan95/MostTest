import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
    name: "basket",
    initialState: {
        data: [1, 2, 3, ]
    },
    reducers:{
        addBasket: (state, action) =>{
            state.data = [...state.data, action.payload]
        }

    }

})
export default basketSlice.reducer
export const {addBasket} = basketSlice.actions