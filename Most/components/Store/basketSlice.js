import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
    name: "basket",
    initialState: {
        data: []
    },
    reducers:{
        addBasket: (state, action) =>{
            state.data = [...state.data, {total: action.payload.total, item: action.payload.item}]
        },
        deleteBasket: (state, action) =>{
            state.data = state.data.filter((i, index)=>{
                // if(index !== action.payload){
                //     return i
                // }
                // else{
                //     return
                // }

                if(i.total === 0 || i.total < 0){
                    return
                }
                else return i.total = i.total - 1 
                
            })
        }

    }

})
export default basketSlice.reducer
export const {addBasket, deleteBasket} = basketSlice.actions