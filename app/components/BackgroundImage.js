import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ImageBackground,
    View
} from 'react-native';

export default class BackgroundImage extends Component {
    render() {
        console.log("Heloooooooooooooooooooooooooooooooooooooo");
        console.log("this is image property"+this.props.img);
        return (
            <ImageBackground source={{ uri: this.props.img }}
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
