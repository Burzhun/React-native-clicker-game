import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, LogBox   } from 'react-native';
import GamePage from './components/gamePage';
import MainPage from './components/mainPage';
import RecordsPage from './components/recordsPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import _ from 'lodash';

/* LogBox.ignoreLogs(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
}; */
const Stack = createStackNavigator();
export default function App() {

  return(
  <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MainPage} />
        <Stack.Screen name="Game" component={GamePage} />
        <Stack.Screen name="Records" component={RecordsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

