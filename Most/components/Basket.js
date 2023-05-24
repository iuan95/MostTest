import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, ScrollView, StyleSheet, Image, Pressable} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import {addBasket, deleteBasket} from "./Store/basketSlice"


function Basket({navigation}){

    const dispatch = useDispatch()
    const basket= useSelector((state) => state.basket.data)
    const basketLenght = basket.length;
    // console.log(basketLenght)
    // console.log(basket)
    return(
        <ScrollView>
            {
            basket.map((i)=>{
                console.log(i.images)
                return(
                    <View style={style.view}>
                        <View>
                            <Image
                                style={style.img}
                                source={{uri: `${!i.images? "": i.images[0]}`}}
                            />
                        </View>
                        <View style={{marginLeft: 10, flex: 1}}>
                            <Text>{i.title}</Text>
                            <Text>{i.price} $</Text>
                        </View>
                        <View style={style.viewright}>
                            <Pressable style={style.btn} onPress={()=>{
                                i.inBasket = true
                                dispatch(deleteBasket(i.id))
                            }}>
                                <Text>Удалить</Text>
                            </Pressable>
                            {/* <Button style={style.btn} title='в корзину'/> */}
                        </View>
                    </View>
                )
            })
            }

        </ScrollView>

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
export default Basket;