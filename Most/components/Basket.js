import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View,} from 'react-native';



function Basket({navigation}){
    return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text> Корзина</Text>
        </View>
    )
}
export default Basket;