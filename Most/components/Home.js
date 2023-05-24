import React, { useEffect, useState, useCallback } from 'react';
import {RefreshControl, Text, View, Button, ScrollView, StyleSheet, Image, Pressable, ActivityIndicator, TextInput} from 'react-native';
import axios from "axios"
import Basket from './Basket';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './Store/counterSlice'
import {add, addone} from './Store/itemsSlice';
import {addBasket} from "./Store/basketSlice"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import reactNativeIcons from 'react-native-vector-icons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from '@mdi/react';
import { mdiBasket } from '@mdi/js';
import Itempage from './Itempage'

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
    const [textsearch, setTextsearch] = useState('')

    const menu = <Icon name="menu" size={30} color="black" />;
    const search = <Icon name="search-web" size={30} color="black" />;





    if(items.length === 0){
        return(
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"

            }}>
                <ActivityIndicator size={'large'}  color={"orange"}/>
            </View>
        )
    }
    else{
        return(
            <ScrollView  style={{backgroundColor: "white"}} 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
                <View style={style.header}>
                    <TextInput
                    placeholder='Поиск'
                    onChangeText={setTextsearch}
                    style={{
                        flex: 7,
                        backgroundColor: "#d8d3cf",
                        width: 290,
                        height: 40,
                        borderRadius: 5,
                    }}
                                      
                    />

                          {/* {search} */}
                    <View style={{
                        flex: 1,
                        alignItems:"center",
                        justifyContent: "center",
                    }}>

                        <Pressable>
                            {menu}
                        </Pressable>

                    </View>

                </View>
    
                {
                items.map((i)=>{
                    if(i.title.toLowerCase().indexOf(
                        textsearch.toLowerCase()
                        ) === 0){

                   
                        return(
                            <Pressable key={i.id} style={style.view} onLongPress={()=>{
                                navigation.navigate('Card', {item: i.id})
                                // navigation.navigate('Card')
                            }}>
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
                                    <Pressable style={style.btn} onPress={()=>{
                                        i.inBasket = true
                                        dispatch(addBasket(i))
                                    }}>
                                        <Text>В корзину</Text>
                                    </Pressable>
                                </View>
                            </Pressable>
                        )
                    }
                        
                    })
                }
            </ScrollView>
        ) }}

export default Home;






const HomeStackNav = createNativeStackNavigator()
export const HomeStack = ({navigation}) =>{
    const myIcon = <Icon name="shopping-outline" size={30} color="black" />;
    const basket= useSelector((state) => state.basket.data)
    const basketLenght = basket.length;
    return(
        <HomeStackNav.Navigator>
            <HomeStackNav.Screen name= "Home" component={Home} 
            options={{
                title: "Главная",
                headerStyle:{
                    backgroundColor: "orange",

                },
                headerRight:()=>(
                    <Pressable 
                    
                    onPress={()=>navigation.navigate("Basket")}
                    style={{
                        position: "relative",
                        // backgroundColor: "white",
                        width: 40,
                    }}>
                        <View style={{position: "relative"}}>
                            <Text style={{
                            flex: 1,
                            position: "absolute",
                            backgroundColor: "#ff310c",
                            width: 20,
                            height: 20,
                            top: 0,
                            right: 0,
                            color: "white",
                            borderRadius: 50,
                            textAlign: "center",
                            fontSize: 15,
                            zIndex: 100,
                        
                        }}>{basketLenght}</Text>
                            {myIcon}
                        </View>
                    </Pressable>
              ),
            }}
                
                />
            <HomeStackNav.Screen name= "Basket" component={Basket}
                options={
                    {
                        title: "Корзина"
                    }
                }
            />
            <HomeStackNav.Screen name= "Card" component={Itempage}
                options={
                    {
                        title: "Товар"
                    }
                }
            />

        </HomeStackNav.Navigator>
    )
}
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