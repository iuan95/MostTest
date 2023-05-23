import React, { useEffect, useState, useCallback } from 'react';
import {RefreshControl, Text, View, Button, ScrollView, StyleSheet, Image, Pressable} from 'react-native';
import axios from "axios"
import Basket from './Basket';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './Store/counterSlice'
import {add, addone} from './Store/itemsSlice';
import {addBasket} from "./Store/basketSlice"


function Home({navigation}){
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }, []);

    const dispatch = useDispatch()
    useEffect(()=>{
        axios.get("https://dummyjson.com/products")
        .then((res)=>{
            setData(res.data.products)
            dispatch(add(res.data.products))

        })
        .catch((err)=>console.log(err))
    }, [])
    const [count, setCount] = useState(0)

    const items = useSelector((state) => state.items.data)
    const basket= useSelector((state) => state.basket.data)
    const basketLenght = basket.length;
    console.log(basket)
    console.log(basketLenght)
    return(
        <ScrollView  style={{backgroundColor: "white"}} 
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
            <View style={style.header}>
                <View >
                    <Text style={{fontSize: 26}}>Most</Text>
                </View>
                <View>
                    <Text>Корзина: {basketLenght}</Text>

                </View>
            </View>

            {
                items.map((i)=>{
                    return(
                        <View style={style.view}>
                            <View>
                                <Image
                                    style={style.img}
                                    source={{uri: `${i.images[0]}`}}
                                />
                            </View>
                            <View style={{marginLeft: 10, flex: 1}}>
                                <Text>{i.title}</Text>
                                <Text>{i.price} $</Text>
                            </View>
                            <View style={style.viewright}>
                                <Pressable style={style.btn}>
                                    <Text>В корзину</Text>
                                </Pressable>
                                {/* <Button style={style.btn} title='в корзину'/> */}
                            </View>
                        </View>
                    )
                })
            }
            {/* //<Text>{items}</Text> */}
            {/* <Button title='+1' onPress={()=>dispatch(addone())}/>
            <Button title='+5' onPress={()=>dispatch(add(5))}/> */}
            {/* <Button title={"Добавить"} titleStyle={{color: "black"}} onPress={()=>setCount(e=>e=e+1)}/>
            <Text>{count}</Text>
            <Button title={"Перейти к корзине"}  titleStyle={{color: "black"}} onPress={()=>navigation.navigate("Корзина")}/> */}
        </ScrollView>


    )
}
export default Home;

const style = StyleSheet.create({
    header: {
        flex: 1,
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: "#330800",
        position: "relative",
        top: 0,
        zIndex: 111,
        marginBottom: 15,
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "space-between",
    },
    view:{
        marginBottom: 15,
        flex: 1,
        flexDirection:"row",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ff6347",
        paddingRight: 20,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom:10,
        backgroundColor: "#fff9f8",

    },
    img:{
        flex: 1,
        width: 100,
        height: 60,
        borderRadius: 10,
        backgroundColor: "red",
    },
    btn: {
        color: "red",
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#ffa695",
    },
    viewright:{
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        
    }
})
                            {/* <Text>{i.id}</Text> */}
                            {/* <Text>{i.price}</Text>
                            <Text>{i.discountPercentage}</Text>
                            <Text>{i.rating}</Text>
                            <Text>{i.stock}</Text>
                            <Text>{i.brand}</Text>
                            <Text>{i.category}</Text>
                            <Text>{i.thumbnail}</Text> 
                        
                            <Text>{i.title}</Text>
                            <Text>{i.description}</Text>*/}