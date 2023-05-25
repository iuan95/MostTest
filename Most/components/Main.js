import React, { useState, useEffect } from 'react';
import {Text, View, Button, ActivityIndicator} from 'react-native';
import Basket from './Basket';
import Header from './Header'
import Home from './Home';
import jwtdecode from "jwt-decode"
import { HomeStack } from './Home';
import { LoginStack } from './Auth/Login';
import { Login } from './Auth/Login';
import { Signup } from './Auth/Signup';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux'
import { refresh } from './Store/userSlice';
import axios from 'axios';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Main({navigation}){
  const axiosRefreshToken = axios.create();
  const count1 = useSelector((state) => state.user.email)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  

  const refreshToken = async () => {
    try{
        const tokens = await axios.post('http://10.0.2.2:3007/api/refresh', 
        {token: user.refToken},
          {
            headers: {
              authorization: `Bearer: ${user.token}`
            }
          }
        )
        dispatch(refresh({token: tokens.accessToken, reftoken: tokens.refreshToken}))
        return tokens.data
    }
    catch(err){
      console.log(err)
    }
  }
  axiosRefreshToken.interceptors.request.use(
    async (config) => {
      const time = new Date()
      const decTok = jwtdecode(user.token)
      if(decTok.exp * 1000 < time.getTime()){
        const newtokens = await refreshToken();
        config.headers['authorization'] = "Bearer " + newtokens.accessToken;
      }
      return config;

    },
    (err) => {
      return Promise.reject(err)
    }
  )
    


  
    if(!count1){
      return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name= "auth" component={LoginStack} options={{title: "Авторизация"}}/>
        </Stack.Navigator>
      )

    }
    else {
      return(
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let icon;
  
              if (route.name === 'Главная') {
                icon = focused
                  ? "home"
                  : "home"
              } else if (route.name === 'Профиль') {
                icon = focused ? "user"  : "user" ;
              }
              return <Icon size={32} name= {icon}  />
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Главная" component={HomeStack} options={{tabBarBadge: 3, headerShown: false, }}/>
          <Tab.Screen name="Профиль" component={Profile}  options={{headerShown: false, title:"Профиль"}}/>
        </Tab.Navigator>
    )
    }

}
export default Main;