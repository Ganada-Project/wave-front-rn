import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { Wrapper, Header } from '../HomeScreen/styles';
import { HeadderText, Body } from './styles';
import { AuthTopBarOption } from '../../constants';

class SizeCardListScreen extends Component {
  static options() {
    return {
      topBar: {
        ...AuthTopBarOption,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  closeModal = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  render() {
    return (
      <Wrapper>
        <Header>
          <TouchableWithoutFeedback onPress={this.closeModal}>
            <View
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon name="close" type="evilicons" size={25} />
            </View>
          </TouchableWithoutFeedback>
        </Header>
        <Body>
          <HeadderText>사이즈 카드</HeadderText>
        </Body>
      </Wrapper>
    );
  }
}

export default SizeCardListScreen;
