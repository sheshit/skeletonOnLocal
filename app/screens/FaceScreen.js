import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,Button
} from 'react-native';
import { Constants } from 'expo';

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

  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate("Auth");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Facebook feed!!
        </Text>
        <Button color="#000" title = "Sign Out!!" onPress={this.signOutUser.bind(this)}/>      
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