import React, {useEffect, useState} from 'react';
import {ScrollView, Pressable, Text, View, Button} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import {addBasket, deleteBasket, deleteAllBasket, clearBasket} from "./Store/basketSlice"
import BasketCard from './BasketCard';


function Basket({navigation}){
    const dispatch = useDispatch()
    const basket= useSelector((state) => state.basket.data)
    const [basketEmpty, setBasketEmpty] = useState(true)
    useEffect(()=>{
        if(basket.length > 0){
            setBasketEmpty(false)
        }
        else {
            setBasketEmpty(true)
        }
    }, [basket])
    return(
        <ScrollView>
            {

            basket.map((i, k)=>{
                return(
                    <BasketCard  i={i} dispatch={dispatch} deleteAllBasket={deleteAllBasket} deleteBasket={deleteBasket} addBasket={addBasket} navigation={navigation} />
                )

            })
            }

            {
                !basketEmpty?
                (  
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center" }} >
                        <Button title='Очистиь корзину' onPress={()=>dispatch(clearBasket())}/>
                    </View>
                ): 
                (
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center" }} >
                        <Text style={{fontSize: 20}} >В корзине нет товаров</Text>
                    </View>
                )
            }

        </ScrollView>
    )
}

export default Basket;