import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import styles from './styles';
import { RegisterForm, FullWidthButton } from '../../Components';
import { keyboardBehavior, keyboardVerticalOffset } from '../../constants';

export class PasswordScreen extends Component {
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
      password: '',
    };
  }

  navigateToGender = () => {
    const {
      componentId, phone, name, nickname,
    } = this.props;
    const { password } = this.state;
    Navigation.push(componentId, {
      component: {
        name: 'wave.gender',
        passProps: {
          phone,
          name,
          nickname,
          password,
        },
      },
    });
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={keyboardBehavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={styles.header}>
          <Text style={styles.header__title}>보안</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.body__text}>
            비밀번호를 8자 이상으로해주세요.
          </Text>
          <RegisterForm
            label="비밀번호"
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <View style={styles.footer}>
          <FullWidthButton
            onPress={this.navigateToGender}
            invert
            content="다음 단계"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

PasswordScreen.propTypes = {
  componentId: PropTypes.string,
  name: PropTypes.string,
  nickname: PropTypes.string,
  phone: PropTypes.string,
};

export default PasswordScreen;
