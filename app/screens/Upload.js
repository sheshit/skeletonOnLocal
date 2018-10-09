import React from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import BackgroundImage from "../components/BackgroundImage";
import { iam_access_id, iam_secret, ip_address } from "./keys.js";

export default class UploadScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            imageUri: ''
        };
    }

    sendPostToBackend() {
        const { itemId } = this.props.navigation.state.params;
        const data = new FormData();
        data.append('username', 'ram siran g jaffa');
        data.append('tagline', this.state.text);
        data.append('uploadImage', {
            uri: itemId,
            type: "image/jpg",
            name: "hello world",
        });
        data.append('numberOfLikes', 0);
        console.log(data);
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: data,
        };
        fetch(ip_address + "/upload-image", config)
            .catch((err) => { console.log(err); });
        this.props.navigation.navigate("HomeScreen");
    }

    render() {
        const { itemId } = this.props.navigation.state.params;
        console.log(itemId);
        return (
            <BackgroundImage img={itemId}>
                <View style={styles.topView} >
                    <MaterialIcons name="add-circle-outline" size={42} color="white" />
                    <View style={styles.bottomView}>
                        <TextInput
                            style={{ color: 'white', paddingLeft: 20, }}
                            placeholder="Enter Something"
                            placeholderTextColor="white"
                            onChangeText={(text) => this.setState({ text })}
                            value = {this.state.text}
                        />
                    </View>
                    <TouchableOpacity onPress={this.sendPostToBackend.bind(this)}>
                        <Ionicons name="md-checkmark-circle" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </BackgroundImage>

        );
    }
}



const styles = StyleSheet.create({

    bottomView: {
        width: '78%',
        height: 40,
        marginLeft: 0,
        //backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: 'center',
        borderRadius: 40,
    },
    topView: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        flex: 1,
        bottom: 0,
        paddingVertical: 10,
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
    },
});