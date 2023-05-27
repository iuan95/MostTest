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
                    action.payload.item = i.item 
                    action.payload.total = parseInt(action.payload.total)  + parseInt(i.total) 
                    i = null
                    return i
                }
                else return i

            })
            state.data = [...state.data, {total: action.payload.total, item: action.payload.item}]
        },
        deleteBasket: (state, action) =>{
            state.data = state.data.filter((i, index)=>{
                if(i.item.id === action.payload.i.item.id){
                    if(Number(i.total) < 0 || Number(i.total) === 1){
                        return
                    } 
                    i.total = i.total - action.payload.total
                    if(Number(i.total === 0 || i.total < 0)) {
                        return
                    }
                    return i
                }

                return i
                
            })
        },

        deleteAllBasket: (state, action) => {
            state.data = state.data.filter(i=>{
                if (i.item.id === action.payload.item.id){
                    return
                }
                else return i
            })
        },
        clearBasket: (state) => {
            state.data = []
        }

    }

})
export default basketSlice.reducer
export const {addBasket, deleteBasket, deleteAllBasket, clearBasket} = basketSlice.actions


// deleteBasket: (state, action) =>{
//     state.data = state.data.filter((i, index)=>{
//         if(i.item.id === action.payload.item.id){
//             if(Number(i.total) < 0 || Number(i.total) === 1) return
//             i.total = i.total - 1
//             return i
//         }

//         return i
        
//     })
// },










// import { createSlice } from '@reduxjs/toolkit'

// export const basketSlice = createSlice({
//     name: "basket",
//     initialState: {
//         data: []
//     },
//     reducers:{
//         addBasket: (state, action) =>{
//             state.data = state.data.filter(i=>{
//                 if(i.item.id === action.payload.item.id){
//                     // console.log(i.total)
//                     // console.log(action.payload.total)
//                     action.payload.item = i.item 
//                     action.payload.total = parseInt(action.payload.total)  + parseInt(i.total) 
//                     i = null
//                     return i
//                 }
//                 else return i

//             })
//             state.data = [...state.data, {total: action.payload.total, item: action.payload.item}]
//             // state.data = [...state.data, {total: action.payload.total, item: action.payload.item}]
//         },
//         deleteBasket: (state, action) =>{
//             state.data = state.data.filter((i, index)=>{
//                 if(i.item.id === action.payload.i.item.id){
//                     if(Number(i.total) < 0 || Number(i.total) === 1) return
//                     i.total = i.total - action.payload.total
//                     if(Number(i.total === 0 || i.total < 0)) return
//                     return i
//                 }

//                 return i
                
//             })
//         },

//         deleteAllBasket: (state, action) => {
//             state.data = state.data.filter(i=>{
//                 if (i.item.id === action.payload.item.id){
//                     return
//                 }
//                 else return i
//             })
//         }

//     }

// })
// export default basketSlice.reducer
// export const {addBasket, deleteBasket, deleteAllBasket} = basketSlice.actions