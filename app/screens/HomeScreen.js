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
import Dataset from 'impagination';
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
  region: "ap-south-1"
});

var s3 = new AWS.S3();

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      imageUri: null,
      s3PreSignedUrl: "",
      dataset: null,
      datasetState: null,
    };
    this.lapsList = this.lapsList.bind(this);
  }

  setupImpagination() {
    let dataset = new Dataset({
      pageSize: 5,
      observe: (datasetState) => {
        this.setState({datasetState});
      },
      fetch(pageOffset, pageSize, stats) {
        return fetch(`http://192.168.201.57:3000/get-posts/data/page=${pageOffset}`)
          .then(response => response.json())
          .catch((error) => {
            console.error(error);
          });
      }
    });
    dataset.setReadOffset(0);
    this.setState({dataset});
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

  componentWillMount(){
    this.setupImpagination();
  }

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
    console.log(this.state.datasetState);
    return this.state.datasetState.map((record) => {
      var params = {
        Bucket: "projectnativeimages-bucket",
        Key: record.content.uploadImage
      };
      return (
        <CardComponent
          name={record.content.username}
          tag={record.content.tagline}
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
