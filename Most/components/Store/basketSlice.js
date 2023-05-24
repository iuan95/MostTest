import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
    name: "basket",
    initialState: {
        data: []
    },
    reducers:{
        addBasket: (state, action) =>{
            state.data = [...state.data, action.payload]
        },
        deleteBasket: (state, action) =>{
            state.data = state.data.filter((i, index)=>{
                if(index !== action.payload){
                    return i
                }
                else{
                    return
                }
            })
        }

    }

})
export default basketSlice.reducer
export const {addBasket, deleteBasket} = basketSlice.actions