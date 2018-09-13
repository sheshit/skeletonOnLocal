import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,Alert,TouchableOpacity
} from 'react-native';
import {Constants} from 'expo';
import {Entypo,Ionicons} from '@expo/vector-icons';
import HeaderComponent from '../components/HeaderComponent';
import CardComponent from '../components/CardComponent';
import * as firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';
import ProfileScreen from './Profile.js';
import UploadScreen from './Upload.js';
import PhotoCardScreen from './PhotoCardScreen.js';
import { Container, Content, Icon } from 'native-base'
export default class HomeScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
  title: "Awesome App",
  headerRight: <Icon onPress={()=>{ navigation.navigate('Upload'); }} style={{ paddingRight: 10 }} name="ios-add-circle" />,
});


    signOutUser = async () => {
      try {
          await firebase.auth().signOut();
            this.props.navigation.navigate('Auth');
      } catch (e) {
          console.log(e);
      }
  }

  render() {
    return (
      <Container style={styles.container}>
                  <Content>
                      <CardComponent imageSource="1" likes="101" />
                      <CardComponent imageSource="2" likes="201" />
                      <CardComponent imageSource="3" likes="301" />
                  </Content>
              </Container>
    );
  }
}
/*
export default createStackNavigator(
      {
      HomeScreen:HomeScreen,
      Profile:ProfileScreen,
      PhotoCardScreen:PhotoCardScreen,
      },
      {
        initialRouteName:'HomeScreen'
      }
      );
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: 'center',
    //alignItems: 'center',
   // paddingTop:Constants.statusBarHeight,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    //margin: 10,
  }
});
