import React, { Component } from 'react';
import {
  KeyboardAvoidingView, Platform, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import styles from './styles';
import { RegisterForm, FullWidthButton } from '../../Components';
import { keyboardVerticalOffset, keyboardBehavior } from '../../constants';

export class RegisterNameScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        noBorder: true,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      name: '',
    };
  }

  navigateToPhoneVerify = () => {
    const { nickname, name } = this.state;
    const { componentId, gender } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.phoneVerify',
        passProps: { gender, nickname, name },
      },
    });
  };

  render() {
    const { nickname, name } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={keyboardBehavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={styles.header}>
          <Text style={styles.header__title}>어떻게 부르면 될까요?</Text>
        </View>
        <View style={styles.body}>
          <RegisterForm
            label="닉네임"
            onChangeText={(text) => this.setState({ nickname: text })}
          />
          <RegisterForm
            label="이름"
            onChangeText={(text) => this.setState({ name: text })}
          />
        </View>
        <View style={styles.footer}>
          <FullWidthButton
            disabled={!!(nickname === '' || name === '')}
            onPress={this.navigateToPhoneVerify}
            invert
            content="다음 단계"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

RegisterNameScreen.propTypes = {
  componentId: PropTypes.string,
  gender: PropTypes.string,
};

export default RegisterNameScreen;
