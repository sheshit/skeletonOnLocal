import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import {
  Card,
  CardItem,
  Thumbnail,
  Body,
  Left,
  Right,
  Button,
  Icon
} from "native-base";

class CardComponent extends Component {
  render() {
    console.log("FROM CARD COMPONENT PROPS-----------" + this.props.imageUrl);
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={require("../assets/me.jpg")} />
            <Body>
              <Text>{this.props.name} </Text>
              <Text note>{this.props.tag}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{ uri: this.props.imageUrl }}
            style={{
              height: 200,
              width: '100%',
              flex:1,
              resizeMode: "contain"
            }}
          />
        </CardItem>
        <CardItem style={{ height: 45 }}>
          <Left>
            <Button transparent>
              <Icon name="ios-heart-outline" style={{ color: "black" }} />
            </Button>
            <Button transparent onPress={() => this.props.navigate(this.props.destination)}  >
              <Icon name="ios-chatbubbles-outline" style={{ color: "black" }} />
            </Button>
            <Button transparent>
              <Icon name="ios-send-outline" style={{ color: "black" }} />
            </Button>
          </Left>
        </CardItem>

        <CardItem style={{ height: 20 }}>
          <Text>{this.props.likes} </Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              <Text style={{ fontWeight: "900" }}>Karthikeya</Text>
              {this.props.tag}
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
export default CardComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
