import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, PermissionsAndroid,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    Navigation.events().registerBottomTabSelectedListener(
      ({ selectedTabIndex, unselectedTabIndex }) => {
        // console.log(selectedTabIndex);
      },
    );
  }

  componentWillUnmount() {
    const bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener();
    bottomTabEventListener.remove();
  }

  navigationButtonPressed({ buttonId }) {
    console.log(buttonId);
  }

  modalTabSelected() {
    console.log('sdf');
  }

  render() {
    return (
      <View>
        <TouchableOpacity>
          <Text style={{ marginTop: 50 }}>HomeScreen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeScreen;
