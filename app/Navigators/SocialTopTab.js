import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation';
import FaceScreen from '../screens/FaceScreen';
import TweetScreen from '../screens/TweetScreen';

export const SocialTopTab = createMaterialTopTabNavigator(
      {
      Facebook:FaceScreen,
      Twitter:TweetScreen,
      },
      {
        initialRouteName:'Facebook',
      }
      );
