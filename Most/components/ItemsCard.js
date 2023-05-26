import React, { useEffect, useState, useCallback } from 'react';
import { RefreshControl, Text, View, Button, ScrollView, StyleSheet, Image, Pressable, ActivityIndicator, TextInput} from 'react-native';


// function ItemsCard({i,selectedCategory,textsearch,addBasket,dispatch,  navigation}){
const ItemsCard = (props) =>{

    const [onbasket, setOnbasket] = useState(false)
    const [totalitem, setTotalitem] = useState(1)
    const [inBasket, setInBasket] = useState(false)
    useEffect(()=>{
        props.basket.filter(i=>{
            if(i.item.id === props.i.id){
                console.log(i.item.id)
                console.log(props.i.id)
                setInBasket(true)
            }
            else setInBasket(false)
        })
    }, [setInBasket] )

        if(props.selectedCategory !== "all"){
            if(props.i.category != props.selectedCategory){
                return
            } 
        }
        if(props.i.title.toLowerCase().indexOf(
            props.textsearch.toLowerCase()
            ) === 0 ){
            return(
                <Pressable key={props.i.id} style={style.view} onPress={()=>{
                    props.navigation.navigate('Card', {item: props.i.id})
                }}>
                    <View>
                        <Image
                            style={style.img}
                            source={{uri: `${props.i.images[0]}`}}
                        />
                    </View>
                    <View style={{marginLeft: 10, flex: 1}}>
                        <Text>{props.i.title}</Text>
                        <Text>{props.i.price} $</Text>
                    </View>
                    <View style={style.viewright}>
                        <TextInput placeholder='Кол-во' inputMode='numeric'  defaultValue={totalitem}
                            onChangeText={setTotalitem} /> 
                        <Pressable style={style.btn} onPress={()=>{
                            props.dispatch(props.addBasket({total: totalitem, item: props.i}))
                            // setOnbasket(true)
                            setInBasket(true)
                            setTotalitem(1)
                        }}>
                            {
                                inBasket?(
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
            )} 
        
        }
export default ItemsCard 


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

