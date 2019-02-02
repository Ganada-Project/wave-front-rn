/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { Text, View } from "react-native";
// redux things
import { connect } from "react-redux";
import { compose } from "redux";

import reducer from "./reducer";
// import saga from "./saga";
// import injectSaga from "utils/injectSaga";
import injectReducer from "../../utils/injectReducer";

class App extends Component {
  render() {
    return (
      <View>
        <Text>Welcome to React Native!</Text>
        <Text>To get started, edit App.js</Text>
        <Text>instructions</Text>
      </View>
    );
  }
}

// const withReducer = injectReducer({ key: "app", reducer });
// const withSaga = injectSaga({ key: "app", saga });

export default compose()(App);
// withReducer
// withSaga
