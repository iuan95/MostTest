import Icon from 'react-native-vector-icons/FontAwesome';
import Basket from './Basket';
import {View, Text, StyleSheet, Button, ScrollView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
function Itempage({route, navigation}){

    const itemId = route.params.item
    const items = useSelector((state) => state.items.data)
    // console.log(items[0].id)
    let item;
    
    items.map((i)=>{
        if(i.id === itemId){
            item = i;
        }
        return;
    })

    console.log(item)
    if(item){
        return(
            <ScrollView style={{backgroundColor:"white",
                flex: 1,
            }}>
                <Text style={style.text}>brand: {item.title}</Text>
                <Text style={style.text}>category: {item.brand}</Text>
                <Text style={style.text}>description: {item.category}</Text>
                <Text style={style.text}>discountPercentage: {item.description}</Text>
                <Text style={style.text}>{item.discountPercentage}</Text>
                <Text style={style.text}>{item.id}</Text>
                <Text style={style.text}>{item.images}</Text>
                <Text style={style.text}>{item.price}</Text>
                <Text style={style.text}>{item.category}</Text>
                <Text style={style.text}>{item.rating}</Text>
                <Text style={style.text}>{item.stock}</Text>
                <Text style={style.text}>{item.thumbnail}</Text>
                <Text style={style.text}>{item.category}</Text>
            </ScrollView>
        )
    }
    else{
        return(
            <View>
                <Text>
                    Пусто
                </Text>
            </View>
        )
    }

}
export default Itempage;
const style = StyleSheet.create({
    text: {
        fontSize: 15,
    }
})

