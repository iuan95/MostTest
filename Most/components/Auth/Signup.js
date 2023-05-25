import { useState } from "react"
import {ScrollView,View, Text, TextInput, SafeAreaView, StyleSheet, Button, TouchableOpacity} from "react-native"
import axios from "axios"


export const Signup = ({navigation}) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    function hundleSubmit(){
        console.log("asdasd")
        axios.post('http://10.0.2.2:3007/api/signup', {email, password})
            .then((res)=>console.log(res))
            .catch(err=>console.log(err))
        setEmail("")
        setPassword("")
    }

    return(
        <ScrollView style={style.view}>
            <View style={style.SafeAreaView}>
                <Text style={style.text}>Регистрация</Text>
                <TextInput style = {style.input}
                    placeholder="email"
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput style = {style.input}

                    onChangeText={setPassword}
                    value={password}
                    placeholder="password"
                />
                <TouchableOpacity style={style.btn} onPress={hundleSubmit}>
                    <Text style={style.btntext}>Зарегистрироваться</Text>
               </TouchableOpacity>
               <Text>{email}</Text>
               <Text>{password}</Text>
             
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