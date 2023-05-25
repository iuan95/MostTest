import { useState } from "react"
import {ScrollView,View, Text, TextInput, SafeAreaView, StyleSheet, Button, TouchableOpacity} from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Signup } from "./Signup";
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux'
import { adduser } from "../Store/userSlice"

export const Login = ({navigation}) =>{

    const [answer, setAnswer] = useState('')
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    function hundleSubmit(){
        axios.post('http://10.0.2.2:3007/api/login', {email, password})
            .then((res)=>{
                dispatch(adduser({email: res.data.email, token: res.data.accessToken, refToken: res.data.refreshToken}))
            })
            .catch(err=>console.log(err))

    }
    return(
        <ScrollView style={style.view}>
            <View style={style.SafeAreaView}>
                <Text style={style.text}>Войти</Text>
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
                <TouchableOpacity style={style.btn1}  onPress={hundleSubmit} >
                    <Text style={style.btntext1}>Войти</Text>
               </TouchableOpacity>
                <Text>У вас не аккаунта?</Text>
                {/* <Button title={"Регистраиция"} style={style.btn}/> */}
               <TouchableOpacity style={style.btn} >
                    <Text style={style.btntext} 
                    onPress={()=>navigation.navigate("signup")}>Регистрация</Text>
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
        width: 150,
        height: 40,
        backgroundColor: "#ff6347",
        alignItems: "center",
        justifyContent: "center",
    },
    btn1: {
        borderRadius: 40,
        color: "#ff6347",
        width: 100,
        height: 40,
        backgroundColor: "#ff6347",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
    },
    btntext:{
        fontSize: 15,
        color: "white",
    },
    btntext1:{
        fontSize: 18,
        color: "white",
    }
})
const LoginStackNav = createNativeStackNavigator();
export const LoginStack = ()=>{
    return(
        <LoginStackNav.Navigator >
            <LoginStackNav.Screen name="login" component={Login} options={{
                title: "Авторизация"
            }}/>
            <LoginStackNav.Screen name="signup" component={Signup} options={{
                title: "Регистрация"
            }}/>
        </LoginStackNav.Navigator>
    )

}