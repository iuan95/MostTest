import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
    name: "basket",
    initialState: {
        data: []
    },
    reducers:{
        addBasket: (state, action) =>{
            state.data = state.data.filter(i=>{
                if(i.item.id === action.payload.item.id){
                    console.log(i.total)
                    console.log(action.payload.total)
                    action.payload.item = i.item 
                    action.payload.total = parseInt(action.payload.total)  + parseInt(i.total) 
                    i = null
                    return i
                }
                else return i

            })

            state.data = [...state.data, {total: action.payload.total, item: action.payload.item}]


            // state.data = [...state.data, {total: action.payload.total, item: action.payload.item}]
        },
        deleteBasket: (state, action) =>{
            state.data = state.data.filter((i, index)=>{
                // if(index !== action.payload){
                //     return i
                // }
                // else{
                //     return
                // }
                if(i.item.id === action.payload.item.id){
                    // if(i.total === 0 || i.total < 0){
                    //     return i.total = i.total - 1 
                    // }
                    // else return i
                    if(i.total < 0 || i.total == 0) return
                    i.total = i.total - 1
                    return i
                }

                return i
                
            })
        }

    }

})
export default basketSlice.reducer
export const {addBasket, deleteBasket} = basketSlice.actions