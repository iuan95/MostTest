
import React, { useState, useEffect } from 'react';
import {axiosRefreshToken} from './Main';
import { AxiosJWT } from './Main';
import { useSelector, useDispatch } from 'react-redux'
import {TextInput, StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import axios from 'axios';
import {edituser, logout} from "./Store/userSlice"
function Profile(){
    const user = useSelector((state) => state.user)
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch()
    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [age, setAge] = useState('')
    const [status, setSetstatus] = useState(null)

    useEffect(()=>{
        axios.get("http://10.0.2.2:3007/api/getuserdata",
        {
          headers:{
              authorization: `Bearer: ${user.token}`
          }
        }
        )
        .then((res)=>{
          console.log(res.data)
          dispatch(edituser({surname: res.data.surname, name: res.data.name, phone: res.data.phone, age: res.data.age}))
          setSetstatus(res.data.mewssage)
        
        })
        .catch(err=>{
          console.log("данай кэлбэтэ")
          console.log(err)
        })
        .finally(()=>setEdit(false))
        
      }, [])








    function hundleSubmit(){
        axios.post("http://10.0.2.2:3007/api/editprofile",{
            name: name,
            surname: surname,
            phone: phone,
            age: age
        },
        {
            headers:{
                authorization: `Bearer: ${user.token}`
            }
        }
        )
        .then((res)=>{
            dispatch(edituser({surname: res.data.surname, name: res.data.name, phone: res.data.phone, age: res.data.age}))
            setSetstatus(res.data.mewssage)
    
        })
        .catch(err=>console.log(err))
        .finally(()=>setEdit(false))

    }






    if(!edit){
        return(
            <ScrollView style={style.scr}>
                <View>
                    <Text style={style.txt}>Почта: {user.email}</Text>
                    <Text style={style.txt}>Фамилия: {user.surname}</Text>
                    <Text style={style.txt}>Имя: {user.name}</Text>
                    <Text style={style.txt}>Телефон: {user.phone}</Text>
                    <Text style={style.txt}>Возраст: {user.age}</Text>
                    {
                        status?(
                            <Text>{status}</Text>
                        ):null
                    }
                    <Button title='Редактировать' onPress={()=>setEdit(true)}/>
                </View>
                <Button title="Выйти из аккаунта" onPress={()=>dispatch(logout())}/>
            </ScrollView>
        )
    }
    else{
        return(
        <ScrollView style={style.scr}>
            <View>
                <Text style={style.txt}>{user.email} </Text>
                <TextInput placeholder='Фамилия: ' style={style.txt} defaultValue={user.surname} onChangeText={setSurname}/>
                <TextInput placeholder='Имя:' style={style.txt} defaultValue={user.name} onChangeText={setName}/>
                <TextInput placeholder='Телефон: ' style={style.txt} defaultValue={user.phone} onChangeText={setPhone}/>
                <TextInput placeholder='Возраст: ' style={style.txt} defaultValue={user.age} onChangeText={setAge}/>
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