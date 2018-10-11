import React, { Component, PropTypes } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions
} from "react-native";
import { get, put } from "./api";
import Comment from "./comment";
import Input from "./input";

export default class List extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    comments: [], // array for comments fetched from the API backend
    refreshing: true // whether comments list is being refreshed or not
  };

  // Fetch comments when component is about to mount
  componentWillMount = () => this.fetchComments();

  // Re-fetch comments when user pulls the list down
  onRefresh = () => this.fetchComments();

  // Call API to fetch comments
  fetchComments = async () => {
    this.setState({ refreshing: true });
    try {
      // Make API call
      const response = await get();
      // Convert response to JSON
      const json = await response.json();
      console.log(json);
      this.setState({
        refreshing: false,
        comments: json
      });
    } catch (error) {
      alert(error);
    }
  };

  // Call API to submit a new comment
  submitComment = async comment => {
    this._scrollView.scrollTo({ y: 0 });
    try {
      // Make API call
      const response = await put({
        name: "akula",
        text: comment,
        photoUrl: "5bb1e34ec06d7f2d809650a5.jpg",
        likes: 0
      });
      // Convert response to JSON
      const json = await response.json();
      this.setState({
        // Push new comment to state before existing ones
        comments: [json, ...this.state.comments]
      });
    } catch (error) {
      alert(error);
    }
  };

  render() {
    // Pull comments out of state
    const { itemUrl } = this.props.navigation.state.params;
    console.log(itemUrl);
    const { comments } = this.state;
    Image.getSize(itemUrl, height => {
      this.setState({ height });
    });
    return (
      <View style={styles.container}>
        <Image
          style={{
            flex: 1,
            resizeMode: "cover",
            height: this.state.height
          }}
          source={{
            uri: itemUrl
          }}
        />
        <ScrollView
          ref={scrollView => {
            this._scrollView = scrollView;
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {/* Render each comment with Comment component */}
          {comments.map((data, index) => (
            <Comment comment={data.text} key={index} />
          ))}
        </ScrollView>
        {/* Comment input box */}
        <Input onSubmit={this.submitComment} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 20
  }
});
