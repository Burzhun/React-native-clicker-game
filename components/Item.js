import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';


export default function Item(props) {
    const [lastTime, setLastTime] = React.useState(Date.now());

    useEffect(()=>{
       // alert((Date.now()-lastTime)/1000);

    },[lastTime])

    function test(){
        if(props.active){
            props.addItem();
        }
    }

    return (
        <View  style={{flex: 1, justifyContent:'flex-end'}}>
            <Image source={props.source} style={styles.image} />
            <Text style={styles.title} >{props.title}</Text>
            <Text style={styles.price} >${props.price}</Text>
            <View style={styles.button}>
                <Button
                    onPress={() => test()}
                    style={{ backgroundColor: 'blue'}}
                    disabled={!props.active}
                    title={props.active ? 'Add to cart' : 'Out of stock'}>
                </Button>
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
      flex: 1,
      width:'100%',
      resizeMode: 'contain',
      margin:0
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        top:-20
    },
    title:{
        justifyContent: 'center',
        textAlign: 'center',
        position:'relative',
        top:-40
    },
    price:{
        justifyContent: 'center',
        textAlign: 'center',
        position:'relative',
        top:-30
    }
});