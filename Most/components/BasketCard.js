import React, { useEffect, useState } from 'react';
import { Text, View,StyleSheet, Image, Pressable, TextInput} from 'react-native';
function BasketCard(props){
    const [total, setTotal] = useState(null)

    //новое
    const [total2, setTotal2] = useState(null)
    const [total1, setTotal1] = useState(null)



    function hundleTotal({itemTotal, text}){
        console.log(itemTotal)
        console.log(text)
        if (text > itemTotal){
            setTotal(itemTotal)
        }
        else setTotal(e=>e=text)
    }

    // useEffect(()=>{

    // }[])
         return(
                <View key={props.i.item.id} style={style.view}>
                    <View>
                        <Image
                            style={style.img}
                            source={{uri: `${!props.i.item.images? "": props.i.item.images[0]}`}}
                        />
                    </View>
                    <View style={{marginLeft: 10, flex: 1}}>
                        <Text>{props.i.item.title}</Text>
                        <Text>{props.i.item.price?props.i.item.price:1} $</Text>
                        <Text style={{fontSize: 14, color: "red"}} >{props.i.total} шт</Text>
                    </View>
                    <View style={style.viewright}>

                        <View style={{flex: 1, flexDirection: "row"}}>
                            <TextInput style={style.input} placeholder='Кол-во' maxLength={props.i.total.length} inputMode='numeric' onChangeText={e=>hundleTotal({itemTotal: props.i.total ,text:e})} value={total}/>
                            {/* <TextInput placeholder='Кол-во' maxLength={props.i.total.length} inputMode='numeric' onChangeText={e=>hundleTotal({itemTotal: props.i.total ,text:e})} value={total}/> */}

                            <Pressable style={style.btn} onPress={()=>{
                                props.dispatch(props.deleteBasket({i: props.i, total: total?total:1}))
                                setTotal(1)
                            }}>
                                <Text style={{textAlign: "center"}}>Удалить</Text>
                            </Pressable>
                        </View>

                        <Pressable style={style.btn} onPress={()=>{
                            props.dispatch(props.deleteAllBasket(props.i))
                        }}>
                            <Text>Удалить все</Text>
                        </Pressable>

                    </View>
                </View> 
         
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
        alignItems: "center",
        justifyContent: "center",
    },
    viewright:{
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        rowGap: 20,
        
    },
    input: {
        borderRadius: 5,
        backgroundColor: "#b4b4b4"
    }
})
export default BasketCard;