import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,Image, ScrollView 
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Constants } from 'expo';
import { Entypo, Ionicons } from '@expo/vector-icons';
import HeaderComponent from '../components/HeaderComponent'

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: <Icon style={{ paddingRight: 10 }} name="ios-add-circle" />,
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={[styles.card2, styles.profileCard]}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
              }}
            />
            <Text style={styles.name}>UserName</Text>
          </View>

          <View style={styles.card1}>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Photos</Text>
              <Text style={styles.count}>20</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Followers</Text>
              <Text style={styles.count}>20</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Following</Text>
              <Text style={styles.count}>20</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTittle}>Title</Text>
            <Text>Write Something Here About Yourself</Text>
          </View>

          <View style={styles.photosCard}>
            <Text style={styles.cardTittle}>Photos</Text>
            <View style={(styles.card, styles.photosContainer)}>
              <Image
                style={styles.photo}
                source={{
                  uri: "https://bootdey.com/img/Content/avatar/avatar1.png"
                }}
              />
              <Image
                style={styles.photo}
                source={{
                  uri: "https://bootdey.com/img/Content/avatar/avatar2.png"
                }}
              />
              <Image
                style={styles.photo}
                source={{
                  uri: "https://bootdey.com/img/Content/avatar/avatar3.png"
                }}
              />
              <Image
                style={styles.photo}
                source={{
                  uri: "https://bootdey.com/img/Content/avatar/avatar4.png"
                }}
              />
              <Image
                style={styles.photo}
                source={{
                  uri: "https://bootdey.com/img/Content/avatar/avatar5.png"
                }}
              />
              <Image
                style={styles.photo}
                source={{
                  uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#00BFFF"
  },
  cardTittle: {
    color: "#808080",
    fontSize: 22,
    marginBottom: 5
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "black",
    marginBottom: 10
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    height: 100,
    marginTop: 10
  },
  card2: {
    backgroundColor:'transparent',
    borderRadius: 50,
    padding: 10,
    height: 100,
    marginTop: 10
  },
  card1: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignSelf: "center",
    height: 50,
    marginTop: 10,
    flexDirection: "row"
  },
  profileCard: {
    height: 200,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#FFFFFF"
  },
  detailContent: {
    margin: 10,
    alignItems: "center"
  },
  name: {
    marginTop: 10,
    fontSize: 22,
    color: "#808080"
  },
  profileDetail: {
    alignSelf: "center",
    marginTop: 200,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "#ffffff"
  },
  photosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "auto"
  },
  photosCard: {
    marginTop: 10,
    marginLeft: 20
  },
  photo: {
    width: 113,
    height: 113,
    marginTop: 5,
    marginRight: 5
  }

});
