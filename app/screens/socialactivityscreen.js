import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import {Constants} from 'expo';
import FaceScreen from './FaceScreen.js';
import TweetScreen from './TweetScreen.js';

export default class SocialActivityScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
       <SocialTopTab />
        <Text style={styles.title}>
          SocialActivity
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
    backgroundColor: '#F5FCFF',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    //fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

const SocialTopTab = createMaterialTopTabNavigator(
      {
      Facebook:FaceScreen,
      Twitter:TweetScreen,
      },
      {
        initialRouteName:'Facebook',
      }
      );
