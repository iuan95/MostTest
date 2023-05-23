//Профиль
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './Store/counterSlice'
import {TextInput, StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import axios from 'axios';
function Profile(){
    const user = useSelector((state) => state.user)
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [data, setData] = useState('')
    function hundleSubmit(){
        setEdit(false)
    }
    if(!edit){
        return(
            <ScrollView style={style.scr}>
                <View>
                    <Text style={style.txt}>Почта: {user.email}</Text>
                    <Text style={style.txt}>Фамилия: {user.firstname}</Text>
                    <Text style={style.txt}>Имя: {user.name}</Text>
                    <Text style={style.txt}>Телефон: {user.phone}</Text>
                    <Button title='Редактировать' onPress={()=>setEdit(true)}/>
                </View>
            </ScrollView>
        )
    }
    else{
        return(
        <ScrollView style={style.scr}>
            <View>
                <TextInput placeholder='Почта: ' style={style.txt} defaultValue={user.email} onChangeText={(e)=>setEmail(e)}/>
                <TextInput placeholder='Фамилия: ' style={style.txt} defaultValue={user.firstname} onChangeText={(e)=>setFirstname(e)}/>
                <TextInput placeholder='Имя:' style={style.txt} defaultValue={user.name} onChangeText={(e)=>setName(e)}/>
                <TextInput placeholder='Телефон: ' style={style.txt} defaultValue={user.phone} onChangeText={(e)=>setPhone(e)}/>

                <Button title='Сохранить' onPress={hundleSubmit}/>

            </View>
        </ScrollView>
        )
    }
}
export default Profile;
const style = StyleSheet.create({
    scr:{
        flex: 1,
        backgroundColor: "white",
        padding: 15,
    },
    view: {
        flex: 1,

    },
    txt: {
        flex: 1,
        fontSize: 18,
        marginBottom: 15,
    }

})