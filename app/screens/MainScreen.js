import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import HomeScreen from './HomeScreen.js';
import SocialActivityScreen from './socialactivityscreen.js';
import ProfileScreen from './Profile.js';
import PhotoCardScreen from './PhotoCardScreen.js';
import UploadScreen from './Upload.js';

export default class MainScreen extends Component {
/*
    static navigationOptions = {
        title: "Awesome App",
        headerRight: <Icon style={{ paddingRight: 10 }} name="ios-add-circle" />
    }
*/
    render() {
        return (
            <AppTabNavigator />
        );
    }
}

export const HomeStack =  createStackNavigator({
      HomeScreen:{
      screen :  HomeScreen
      },
      Profile:{
        screen : ProfileScreen
      },
      PhotoCardScreen:{
        screen : PhotoCardScreen
      },
      Upload:{
        screen: UploadScreen
      }
      },
      {
        initialRouteName:'HomeScreen'
      }
      );

const AppTabNavigator = createBottomTabNavigator({

    HomeTab: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel:"Home",
            tabBarIcon: ({ tintColor }) => <Icon name="ios-home" size={30} color={tintColor} />
        }
    },
    SocialActivityTab: {
        screen: SocialActivityScreen,
        navigationOptions: {
            tabBarLabel:"Social",
            tabBarIcon: ({ tintColor }) => <Icon name="ios-home" size={30} color={tintColor} />
        }
    },
    ProfileTab: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarLabel:"Profile",
            tabBarIcon: ({ tintColor }) => <Icon name="person" size={30} color={tintColor} />
        }
    }

}, {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: "bottom",
        tabBarOptions: {
            style: {
                ...Platform.select({
                    android: {
                        backgroundColor: 'white'
                    }
                })
            },
            activeTintColor: '#000',
            inactiveTintColor: '#d1cece',
            showLabel: false,
            showIcon: true
        }
    })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
