import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,TextInput
} from "react-native";

import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';


export default class UploadScreen extends Component {

  constructor(props) {
   super(props);
   this.state = { text: '' };
 }

  render() {

    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');

      return (
          <Card>
              <CardItem cardBody>
                  <Image source={{isStatic:true, uri:{itemId}}} style={{ height: 200, width: null, flex: 1 }} />
              </CardItem>

              <CardItem style={{ height: 20 }}>
              <TextInput
     style={{height: 40, borderColor: 'gray', borderWidth: 1}}
     placeholder='What do you have to say??'
     onChangeText={(text) => this.setState({text})}
     value={this.state.text}
   />
              </CardItem>
              <CardItem>
                  <Body>
                      <Text>
                          <Text style={{ fontWeight: "900" }}>varun
                          </Text>
                        It is an awesome day!!
                      </Text>
                  </Body>
              </CardItem>
          </Card>
      );
  }
}
