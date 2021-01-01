import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Button  } from 'react-native';
import Constants from 'expo-constants';


export default function mainPage({ navigation }){


    return(
        <View  style={styles.container}>
            <Button
                onPress={() => navigation.navigate('Game')}
                style={{ backgroundColor: 'blue'}}
                title={'Start game'}>
            </Button>

            <Button
                onPress={() => navigation.navigate('Records')}
                style={{ backgroundColor: 'blue'}}
                title={'Show records'}>
            </Button>
        </View>
    )
}

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
  });
  