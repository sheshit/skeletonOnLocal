import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
// or any pure javascript modules available in npm
//import { Card } from 'react-native-elements';

import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
//import {MainScreen} from './app/screens/Mainscreen.js';
import HomeScreen from './app/screens/HomeScreen.js';
import SignInScreen from './app/screens/signinscreen.js';
import AuthLoadingScreen from './app/screens/AuthLoadingScreen.js';
import SocialActivityScreen from './app/screens/socialactivityscreen.js';
import ProfileScreen from './app/screens/Profile.js';
import PhotoCardScreen from './app/screens/PhotoCardScreen.js';
import FaceScreen from './app/screens/FaceScreen.js';
import TweetScreen from './app/screens/TweetScreen.js';


export const HomeStack = createStackNavigator(
      {
      HomeScreen:HomeScreen,
      Profile:ProfileScreen,
      PhotoCardScreen:PhotoCardScreen,
      },
      {
        initialRouteName:'HomeScreen'
      }
      );

export const SocialTopTab = createMaterialTopTabNavigator(
      {
      Facebook:FaceScreen,
      Twitter:TweetScreen,
      },
      {
        initialRouteName:'Facebook',
      }
      );

export const SocialStack = createStackNavigator(
      {
      Social:SocialTopTab,
      },
      {
        initialRouteName:'Social',
        navigationOptions: {
      headerStyle: {
        title:'Social Activity',
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      }
      }
      );

export const AppBottomTab = createBottomTabNavigator({
  Home: HomeStack,
  Social: SocialStack,
  },
  {
    initialRouteName:'Home',
  });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppBottomTab,
    Auth: SignInScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
