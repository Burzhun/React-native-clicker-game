
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Button, Modal, TextInput, TouchableWithoutFeedback  } from 'react-native';
import ps5 from '../assets/ps5.jpg'
import xbox from '../assets/xbox.jpg'; 
import rtx3070 from '../assets/rtx3070.png';
import rtx3080 from '../assets/rtx3080.png';
import Constants from 'expo-constants';
import Item from './Item';
import timer from 'react-native-timer'; 
import {db} from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from 'firebase';

export default function GamePage (props){
  const [timeLeft, setTimeLeft] = React.useState(null);
  const [active, setActive] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [name, setName] = React.useState('');
  const [started, setStarted] = React.useState(false);
  const [show_message, setShow_message] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [storedData, setStoredData] = React.useState(false);

  function randInt(min, max){
    return Math.floor(Math.random() * (max + 1 - min) + min)
  }

  useEffect(() => {
    readData();
    return function cleanup() {
      timer.clearInterval('countdown');
      timer.clearInterval('1');
      
    };
  }, []);

  useEffect(()=>{
    if(active>0){
      timer.setTimeout('1', ()=>{
        setActive(0);
      }, 60+Math.random()*600);
    }else{
      timer.setTimeout('2', ()=>{
        if(started)
          next();
      }, Math.random()*3000);
    }
 },[active]);

  useEffect(()=>{
    if (timeLeft > 0) {
      setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      if(timeLeft===null) return;
      if(!storedData['score'] || storedData['score']<score)    
        setShowModal(true);
      setTimeLeft(null);
      timer.clearInterval('countdown');
      setActive(0);
      setStarted(false);
    }
  },[timeLeft]);  

    async function readData(){
      let data={};
      const s = await AsyncStorage.getItem('score');
      if(s) data['score'] = parseInt(s);
      const n = await AsyncStorage.getItem('name');
      if(n){
        data['name'] = n;
        setName(n);
      }
      setStoredData(data);
    }

  function next(){
    setShow_message(false);
    const new_active = randInt(1,4);
    setActive(new_active);
  }

  function start(value){
    console.log(value);
    setStarted(value);
    if(value){
      setTimeLeft(10);  
      next(); 
    }
    else{
      console.log('clear');
      timer.clearInterval('countdown');
      setActive(0); 
      setTimeLeft(null); 
      // setTimeLeft(30);
    }
  }

  function setNewTime(t){
      const diff = t - lastTime;
      setLastTime(t);
  }

  function addItem(id){
    const price= id===4 ? 699 : 499;
    setScore(score+price);
    setShow_message(true);
  }

  function saveScore(){
    db.ref('/scores').push({
      score: score,
      name:name
    });
    setShowModal(false);
    saveData();
  }

  async function saveData(){
    await AsyncStorage.setItem('score', score.toString());
    if(storedData.name !== name)
      await AsyncStorage.setItem('name', name); 
    
  }

  return (
    <View style={styles.container}>      
      <View style={{flexDirection:'row', width:'100%',alignItems: 'center',justifyContent:'space-around'}}>
        <Text>Time left: {timeLeft}</Text>
        <Button
            onPress={() => start(!started)}
            style={{ backgroundColor: 'green'}}
            title={started ? 'Stop' : 'Start'}>
        </Button>
      </View>
      {show_message && <Text style={styles.added_message}>Item added!</Text>}
      <View style={styles.row}>
        <Item active={active===1} addItem={()=>addItem(1)} setNewTime={setNewTime} source={ps5} title='Playstation 5' price={499} /> 
        <Item active={active===2} addItem={()=>addItem(2)} setNewTime={setNewTime} source={xbox} title='Xbox Series X' price={499} /> 
      </View>
      <View style={styles.row}>
        <Item active={active===3} addItem={()=>addItem(3)} setNewTime={setNewTime} source={rtx3070} title='GeForce RTX 3070' price={499}  /> 
        <Item active={active===4} addItem={()=>addItem(4)} setNewTime={setNewTime} source={rtx3080} title='GeForce RTX 3080' price={699} /> 
      </View>
      <View>
        <Text>Score: {score}</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        style={styles.modalContainer}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.modal} >
            <View style={{backgroundColor:'white',padding:40,borderRadius:10,alignItems: 'center',}}>
              <Text>Your score is {score}</Text>
              <TextInput value={name} onChangeText={(s)=>setName(s)} placeholder={'Your name'} style={styles.textInput} editable />
              <View style={{width:'50%', alignItems: 'center',}}>
                <Button
                  onPress={()=>saveScore()}
                  style={{ backgroundColor: 'green'}}
                  title={"Save score"} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      
    </View>
  );
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
    modalContainer:{
      flex: 1,
      height:'100%',
      //backgroundColor: 'transparent',
      backgroundColor: 'rgba(0,0,0,0.7)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput:{
      borderWidth: 1,
      borderColor: "#20232a",
      margin:10,
      width:120,
      height:50,
      padding:10
    },
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    row:{
      flexDirection:'row',
      justifyContent: 'center',
      flex:1,
      width:'90%'
    },
    added_message:{
      position:'absolute',
      color:'green',
      fontSize:24,
      fontWeight:'400',
      marginTop:25
    }
  });
  