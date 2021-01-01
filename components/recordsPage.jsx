import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Button, Modal, TextInput, TouchableWithoutFeedback, FlatList  } from 'react-native';
import Constants from 'expo-constants';
import {db} from './config';
import { database } from 'firebase';
import { useState } from 'react';

export default function RecordsPage (props){
    const [data, setData] = useState([]);

    useState(()=>{
        db.ref('/scores').on("value", function(snapshot) {
            setData(Object.values(snapshot.val()).filter(f=>f['name'] && f['score']).map((f,i)=>({...f,id:i.toString()})).sort((f1,f2)=>f2.score-f1.score));
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    },[]);

    function renderItem({item, index, separators}){
        return <Text style={styles.row}>{index+1}.  {item.name}:  {item.score}</Text>
    }

    return (
        <View style={styles.container}>
            <FlatList renderItem={renderItem} data={data} />
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight+20,
      paddingBottom: Constants.statusBarHeight+50,
      overflow:'hidden',
      width: Dimensions.get('window').width
    },
    row:{
        fontSize:22
    }
});