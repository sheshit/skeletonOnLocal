import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,Alert
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon,Title } from 'native-base';
import {Constants} from 'expo';
import {Entypo,Ionicons} from '@expo/vector-icons';



export default class HeaderComponent extends Component {
  render() {
    return (
<Header>
          <Left>
            <Button transparent onPress={()=>{Alert.alert('Drawer Menu should open')}}>
              <Ionicons name='md-menu' size={32} color="white"/>
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Ionicons name='md-add-circle' size={32} color="white"/>
            </Button>
          </Right>
        </Header>
    )}
}