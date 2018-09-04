import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements';

import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/Profile.js';
import PhotoCardScreen from '../screens/PhotoCardScreen.js'

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
