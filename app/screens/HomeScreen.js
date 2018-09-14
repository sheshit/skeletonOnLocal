import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,Alert,TouchableOpacity,TouchableHighlight
} from 'react-native';
import {Constants,ImagePicker,Permissions} from 'expo';
import {Entypo,Ionicons} from '@expo/vector-icons';
import HeaderComponent from '../components/HeaderComponent';
import CardComponent from '../components/CardComponent';
import * as firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';
import ProfileScreen from './Profile.js';
import UploadScreen from './Upload.js';
import PhotoCardScreen from './PhotoCardScreen.js';
import { Container, Content, Icon } from 'native-base';
import Modal from "react-native-simple-modal";
export default class HomeScreen extends Component {

constructor(props){
  super(props);
  this.state={
    open:false,
    imageUri:null,
  };
}

  static navigationOptions = ({ navigation, screenProps }) => ({
      title: "Awesome App",
      headerRight:  <Icon  onPress={navigation.getParam('openModal')} style={{ paddingRight: 10 }} name="ios-add-circle" />,
  });

  componentDidMount() {
      this.props.navigation.setParams({ openModal: this.openModal });
  }

  _pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ imageUri: result.uri });
    }
  }

  modalDidClose = () => {
    this.setState({ open: false });
  };

  openModal = () => this.setState({ open: true });

  closeModal = () => this.setState({ open: false });

  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
          this.props.navigation.navigate('Auth');
    } catch (e) {
        console.log(e);
      }
  }

  openCamera(){
    this.props.navigation.navigate('Camera');
    this.closeModal();
  }

  render() {

    return (
      <Container style={styles.container}>

                  <Content>
                      <CardComponent imageSource="1" likes="101" />
                      <CardComponent imageSource="2" likes="201" />
                      <CardComponent imageSource="3" likes="301" />
                  </Content>
                  <Modal
                      open={this.state.open}
                      modalDidOpen={this.modalDidOpen}
                      modalDidClose={this.modalDidClose}
                      style={{ alignItems: "center" }}
                    >
                      <View style={{ alignItems: "center" }}>
                       <TouchableHighlight onPress = {this.openCamera.bind(this)} style={styles.submit} underlayColor='#fff' >
                                         <Text style={[styles.submitText]}>Take a Picture!!</Text>
                                   </TouchableHighlight>
                                   <TouchableHighlight onPress={this._pickImage.bind(this)}  style={styles.submit} underlayColor='#fff'>
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
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    //margin: 10,
  },
  submit:{
    marginRight:10,
    marginLeft:10,
    marginTop:20,
    paddingTop:10,
    paddingLeft:30,
    paddingRight:30,
    paddingBottom:10,
    backgroundColor:'#000000',
    borderRadius:50,
    borderWidth: 1,
    borderColor: '#fff'
  },
  submitText:{
      color:'#fff',
      textAlign:'center',
  }
});
