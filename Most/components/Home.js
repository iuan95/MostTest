import React, { useEffect, useState, useCallback } from 'react';
import { RefreshControl, Text, View, Button, ScrollView, StyleSheet, Image, Pressable, ActivityIndicator, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from "axios"
import Basket from './Basket';
import { useSelector, useDispatch } from 'react-redux'
import { edituser } from './Store/userSlice';
import {add, addone} from './Store/itemsSlice';
import {addBasket} from "./Store/basketSlice"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import reactNativeIcons from 'react-native-vector-icons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Itempage from './Itempage'
import ItemsCard  from './ItemsCard';




function Home({navigation}){
    const [data, setData] = useState([])
    const [totalitem, setTotalitem] = useState(1)
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
    const [selectedCategory, setSelectedCategory] = useState('all');
    const menu = <Icon name="menu" size={30} color="black" />;
    const search = <Icon name="search-web" size={30} color="black" />;
    const [v, setV] = useState(0)
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
                <View>
                    <Picker
                        selectedValue = {selectedCategory}
                        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}>
                        <Picker.Item label="Все Категории" value="all" />
                        <Picker.Item label="laptops" value="laptops" />
                        <Picker.Item label="fragrances" value="fragrances" />
                        <Picker.Item label="skincare" value="skincare" />
                        <Picker.Item label="groceries" value="groceries" />
                        <Picker.Item label="home-decoration" value="home-decoration" />
                        <Picker.Item label="furniture" value="furniture" />
                        <Picker.Item label="tops" value="tops" />
                        <Picker.Item label="womens-dresses" value="womens-dresses" />
                        <Picker.Item label="womens-shoes" value="womens-shoes" />
                        <Picker.Item label="mens-shirts" value="mens-shirts" />
                        <Picker.Item label="mens-shoes" value="mens-shoes" />
                        <Picker.Item label="mens-watches" value="mens-watches" />
                        <Picker.Item label="womens-watches" value="womens-watches" />
                        <Picker.Item label="womens-bags" value="womens-bags" />
                        <Picker.Item label="womens-jewellery" value="womens-jewellery" />
                        <Picker.Item label="automotive" value="automotive" />
                        <Picker.Item label="motorcycle" value="motorcycle" />
                        <Picker.Item label="lighting" value="lighting" />
                    </Picker>
                </View>
                <View>
                    {
                    items.map((i)=>{
                        return(
                            <ItemsCard i={i} selectedCategory={selectedCategory} textsearch={textsearch} addBasket={addBasket}  dispatch={dispatch}  navigation={navigation} basket={basket}/>
                        )} ) 
                    }
                </View>
            </ScrollView>
        ) }}
export default Home;




//нижняя навигация

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

