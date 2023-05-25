import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { adduser } from "../Store/userSlice"
import {ScrollView,View, Text, TextInput, SafeAreaView, StyleSheet, Button, TouchableOpacity} from "react-native"
import axios from "axios"

// dispatch(adduser({email, password}))
export const Signup = ({navigation}) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [answer, setAnswer] = useState('')

    async function hundleSubmit({navigation}){
        console.log("asdasd")
        setEmail("")
        setPassword("")
        axios.post('http://10.0.2.2:3007/api/signup', {email, password})
            .then((res)=>setAnswer(e=>e=res.message))
            .then(()=>{
                navigation.navigate('login')
            })
            .catch(err=>console.log(err))

        
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
                {
                    answer?(
                        <Text style={{fontSize: 16,
                        
                        }}>{answer}</Text>
                    ):
                        null
                }
                <TouchableOpacity style={style.btn} onPress={hundleSubmit}>
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