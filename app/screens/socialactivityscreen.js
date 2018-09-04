import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Constants} from 'expo';

export default class SocialActivityScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
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
    paddingTop: 100,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});