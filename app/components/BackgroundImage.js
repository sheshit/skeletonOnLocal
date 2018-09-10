import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View
} from 'react-native';

export default class BackgroundImage extends Component {
    render() {
        return (
            <ImageBackground source={{uri:'https://images.pexels.com/photos/775203/pexels-photo-775203.jpeg?auto=compress&cs=tinysrgb&h=350'}}
                  style={styles.backgroundImage}>

                  {this.props.children}

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
       justifyContent: 'center',
      //  alignItems:'center',
    },


});
