import { useState } from "react"
import {ScrollView,View, Text, TextInput, SafeAreaView, StyleSheet, Button, TouchableOpacity} from "react-native"


export const Signup = ({navigation}) =>{
    return(
        <ScrollView style={style.view}>
            <View style={style.SafeAreaView}>
                <Text style={style.text}>Регистрация</Text>
                <TextInput style = {style.input}
                    placeholder="email"
                    // onChangeText={email}
                    // value={email}
                />
                <TextInput style = {style.input}

                    // onChangeText={password}
                    // value={password}
                    placeholder="password"
                />
                <TouchableOpacity style={style.btn} >
                    <Text style={style.btntext}>Зарегистрироваться</Text>
               </TouchableOpacity>
             
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    view: {
        backgroundColor: "white",
    },
    SafeAreaView: {
        marginTop: 100,
        height: "auto",
        flex: 1,
        rowGap: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: 250,
        height: 45,
        borderRadius: 5,
        fontSize: 20,
        borderWidth: 2,
        borderColor: "#ff6347",
    },
    text:{
        fontSize: 30,
        color: "#ff6347"
    },
    btn: {
        borderRadius: 40,
        color: "#ff6347",
        width: 200,
        height: 40,
        backgroundColor: "#ff6347",
        alignItems: "center",
        justifyContent: "center",
    },
    btntext:{
        fontSize: 15,
        color: "white",
    },
})