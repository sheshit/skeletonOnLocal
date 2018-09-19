import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Constants } from 'expo';
import { Entypo, Ionicons } from '@expo/vector-icons';
import HeaderComponent from '../components/HeaderComponent'

export default class FaceScreen extends Component {
  static navigationOptions = {
    title: 'Facebook',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Facebook feed!!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});