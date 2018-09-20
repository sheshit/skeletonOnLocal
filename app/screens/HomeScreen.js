import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from "react-native";
import { Constants, ImagePicker, Permissions } from "expo";
import { Entypo, Ionicons } from "@expo/vector-icons";
import HeaderComponent from "../components/HeaderComponent";
import CardComponent from "../components/CardComponent";
import * as firebase from "firebase";
import { createStackNavigator } from "react-navigation";
import ProfileScreen from "./Profile.js";
import UploadScreen from "./Upload.js";
import PhotoCardScreen from "./PhotoCardScreen.js";
import { Container, Content, Icon } from "native-base";
import Modal from "react-native-simple-modal";
import { iam_access_id, iam_secret } from "./keys.js";

var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: iam_access_id,
  secretAccessKey: iam_secret,
  region: "us-east-1"
});

var s3 = new AWS.S3();

var array = [
  {
    _id: "5ba225bdce555432dcd7e9dd",
    username: "iron man",
    tagline: "avatar",
    uploadImage: "5ba225bdce555432dcd7e9dd.jpg"
  },
  {
    _id: "5ba1e864ce555432dcd7e9db",
    username: "iron man",
    tagline: "avatar",
    uploadImage: "5ba1e864ce555432dcd7e9db.jpg"
  },
  {
    _id: "5ba1e1d0ae0c2d15d0a1c736",
    username: "iron man",
    tagline: "avatar",
    uploadImage: "5ba1e1d0ae0c2d15d0a1c736.jpg"
  },
  {
    _id: "5ba1e156cf72252ff461e66a",
    username: "iron man",
    tagline: "avatar",
    uploadImage: "5ba1e156cf72252ff461e66a.jpg"
  },
  {
    _id: "5ba1514c0a1caf21f8571a1d",
    username: "karthikeya",
    tagline: "uploading image bro.",
    uploadImage: "5ba1514c0a1caf21f8571a1d.jpg"
  },
  {
    _id: "5ba13e056911911318e55e59",
    username: "karthikeya",
    tagline: "uploading image bro.",
    uploadImage: "5ba13e056911911318e55e59.jpg"
  }
];

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      imageUri: null,
      s3PreSignedUrl: ""
    };
    this.lapsList = this.lapsList.bind(this);
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Awesome App",
    headerRight: (
      <Icon
        onPress={navigation.getParam("openModal")}
        style={{ paddingRight: 10 }}
        name="ios-add-circle"
      />
    )
  });

  componentDidMount() {
    this.props.navigation.setParams({ openModal: this.openModal });
  }

  _pickImage = async () => {
    this.closeModal();
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    if (!result.cancelled) {
      this.setState({ imageUri: result.uri });
    }
    this.props.navigation.navigate("Upload", {
      itemId: this.state.imageUri
    });

    console.log("The data sent from ImagePicker Expo");
    console.log(result);
  };

  modalDidClose = () => {
    this.setState({ open: false });
  };

  openModal = () => this.setState({ open: true });

  closeModal = () => this.setState({ open: false });

  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate("Auth");
    } catch (e) {
      console.log(e);
    }
  };

  openCamera() {
    this.props.navigation.navigate("Camera");
    this.closeModal();
  }

  lapsList() {
    return array.map((data, k) => {
      var params = {
        Bucket: "projectnativeimages-bucket",
        Key: data.uploadImage
      };
      /*   var url = s3.getSignedUrl("getObject", params); 
      console.log("Your generated pre-signed URL is", url);
      //this.setState({ s3PreSignedUrl: url });*/
      return (
        <CardComponent
          key={k}
          name={data.username}
          tag={data.tagline}
          imageUrl={s3.getSignedUrl("getObject", params)}
        />
      );
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>{this.lapsList()}</Content>
        <Modal
          open={this.state.open}
          modalDidOpen={this.modalDidOpen}
          modalDidClose={this.modalDidClose}
          style={{ alignItems: "center" }}
        >
          <View style={{ alignItems: "center" }}>
            <TouchableHighlight
              onPress={this.openCamera.bind(this)}
              style={styles.submit}
              underlayColor="#fff"
            >
              <Text style={[styles.submitText]}>Take a Picture!!</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._pickImage.bind(this)}
              style={styles.submit}
              underlayColor="#fff"
            >
              <Text style={[styles.submitText]}>Upload from gallery!!</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    //alignItems: 'center',
    // paddingTop:Constants.statusBarHeight,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 20,
    textAlign: "center"
    //margin: 10,
  },
  submit: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 20,
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    backgroundColor: "#000000",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff"
  },
  submitText: {
    color: "#fff",
    textAlign: "center"
  }
});
