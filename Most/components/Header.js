import Icon from 'react-native-vector-icons/FontAwesome';
import Basket from './Basket';
import {View, Text, StyleSheet, Button} from 'react-native'

function Header({navigation}){
    return(
            <Surface style={style.header}>
                <View style={style.view}></View>
                <View style={style.view}></View>
                <View style={style.view}></View>
                <View style={style.view}></View>
            </Surface>
    )
}
export default Header;
const style = StyleSheet.create({
    header: {
        height: 50,
        elevation: 4, 
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "tomato"
    },
    view:{
        flex: 1,
        backgroundColor: "yellow"
    }
})