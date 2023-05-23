import React from 'react';
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Main from './components/Main';
import Store from './components/Store/Store';
const Stack = createNativeStackNavigator();
const myIcon = <Icon name="home" size={30} color="tomato" />;
const profile = <Icon name="user" size={30} color="tomato" />;
function App() {
    return(
      <Provider store={Store}>
        <NavigationContainer>
           <Stack.Navigator screenOptions={{ headerShown: false }}>
             <Stack.Screen name= "Main" component={Main} options={{title: "Logo"}}/>
           </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
export default App;
