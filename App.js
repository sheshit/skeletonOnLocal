import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Constants } from "expo";
import {
  createSwitchNavigator,
} from "react-navigation";

import SignInScreen from "./app/screens/signinscreen.js";
import AuthLoadingScreen from "./app/screens/AuthLoadingScreen.js";
import MainScreen from "./app/screens/MainScreen.js";

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MainScreen,
    Auth: SignInScreen
  },
  {
    initialRouteName: "AuthLoading"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  }
});
