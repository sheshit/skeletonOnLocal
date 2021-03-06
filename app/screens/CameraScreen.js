import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { Camera, Permissions } from "expo";
import { Icon } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class CameraScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      image: ""
    };
  }

  snap = async () => {
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
        this.setState({ image: data.uri });
        console.log("this is pic data"+JSON.stringify(data));
      });
    }
    this.props.navigation.navigate("Upload", {
      itemId: this.state.image
    });
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    var deviceWidth = Dimensions.get("window").width;
    deviceWidth = deviceWidth - deviceWidth / 8;

    var deviceHeight = Dimensions.get("window").height;
    deviceHeight = deviceHeight / 18;

    if (this.state.hasCameraPermission === null) {
      return <View />;
    } else if (this.state.hasCameraPermission === false) {
      return <Text> No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1, justifyContent: "space-between" }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View style={{ marginTop: deviceHeight, marginLeft: deviceWidth }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <MaterialCommunityIcons
                  name="window-close"
                  style={{ color: "white", fontSize: 31 }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: 20,
                alignItems: "flex-end"
              }}
            >
              <Icon
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
                name="ios-reverse-camera"
                style={{ color: "white", fontWeight: "bold", fontSize: 45 }}
              />

              <MaterialCommunityIcons
                name="camera-iris"
                onPress={this.snap.bind(this)}
                style={{ color: "white", fontSize: 50 }}
              />

              <Icon
                name="ios-flash"
                style={{ color: "white", fontWeight: "bold", fontSize: 45 }}
              />
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
