import {combineReducers} from 'redux'
import userReducer from './userSlice'
import counterReducer from './counterSlice'
import itemReducer from "./itemsSlice"
import basketSlice from "./basketSlice"
export default combineReducers({
    user: userReducer,
    counter: counterReducer,
    items: itemReducer,
    basket: basketSlice,
})