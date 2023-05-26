import React, { useEffect, useState, useCallback } from 'react';
import { RefreshControl, Text, View, Button, ScrollView, StyleSheet, Image, Pressable, ActivityIndicator, TextInput} from 'react-native';







 export function Card({i,selectedCategory,textsearch,addBasket,  navigation}){
    const [onbasket, setOnbasket] = useState(false)
    const [totalitem, setTotalitem] = useState(1)

        if(selectedCategory !== "all"){
            if(i.category != selectedCategory){
                return
            } 
        }
        if(i.title.toLowerCase().indexOf(
            textsearch.toLowerCase()
            ) === 0 ){
            return(
                <Pressable key={i.id} style={style.view} onPress={()=>{
                    navigation.navigate('Card', {item: i.id})
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
                        <TextInput placeholder='Кол-во' inputMode='numeric' 
                            onChangeText={setTotalitem} /> 
                        <Pressable style={style.btn} onPress={()=>{
                            dispatch(addBasket({total: totalitem, item: i}))
                            setOnbasket(true)
                        }}>
                            {
                                onbasket?(
                                    <Text>Товар в корзине</Text>
                                )
                                :
                                (
                                    <Text>В корзину</Text>
                                )
                            }
                            
                        </Pressable>
                    </View>
                </Pressable>
            )} }
    


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