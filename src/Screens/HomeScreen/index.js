import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

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
