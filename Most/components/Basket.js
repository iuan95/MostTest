import React from 'react';
import {ScrollView} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import {addBasket, deleteBasket, deleteAllBasket} from "./Store/basketSlice"
import BasketCard from './BasketCard';


function Basket({navigation}){
    const dispatch = useDispatch()
    const basket= useSelector((state) => state.basket.data)
    return(
        <ScrollView>
            {
            basket.map((i, k)=>{
                return(
                    <BasketCard i={i} dispatch={dispatch} deleteAllBasket={deleteAllBasket} deleteBasket={deleteBasket} addBasket={addBasket} navigation={navigation} />
                )

            })
            }

        </ScrollView>
    )
}

export default Basket;