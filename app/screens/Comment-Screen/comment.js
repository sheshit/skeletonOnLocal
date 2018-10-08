import React, { PureComponent, PropTypes } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from "react-native";

export default class Comment extends PureComponent {
  render() {
    const name = "pablo ramcobar";
    const avatar =
      "https://storage.googleapis.com/kaggle-avatars/images/956801-gp.jpg";
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {avatar && (
            <Image
              resizeMode="contain"
              style={styles.avatar}
              source={{ uri: avatar }}
            />
          )}
        </View>
        <View style={styles.contentContainer}>
          <Text>
            <Text style={[styles.text, styles.name]}>{name}</Text>{" "}
            <Text style={styles.text}>{this.props.comment}</Text>
          </Text>
          <View style={styles.rightActionBar}>
            <TouchableHighlight style={styles.actionButton}>
              <View style={{ flexDirection: "row" }}>
                <Text>Like</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.actionButton}>
              <Text style={styles.actionText}>Reply</Text>
            </TouchableHighlight>
          </View>
          ;
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  avatarContainer: {
    alignItems: "center",
    marginLeft: 5,
    paddingTop: 10,
    width: 40
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#EEE",
    padding: 5
  },
  avatar: {
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 13,
    width: 26,
    height: 26
  },
  text: {
    color: "#000",
    fontFamily: "Avenir",
    fontSize: 15
  },
  name: {
    fontWeight: "bold"
  },
  created: {
    color: "#BBB"
  },
  rightActionBar: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  actionText: {
    color: "#9B9B9B",
    fontWeight: "bold"
  }
});