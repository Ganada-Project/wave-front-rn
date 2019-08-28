import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';

import styles from './styles';
import { RegisterForm, FullWidthButton } from '../../Components';
import {
  keyboardBehavior,
  keyboardVerticalOffset,
  gradientPreset,
  gradientSpeed,
  InvertOption,
} from '../../constants';

export class PasswordScreen extends Component {
  static options() {
    return {
      topBar: {
        ...InvertOption,
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
    const { componentId, phone } = this.props;
    const { password } = this.state;
    Navigation.push(componentId, {
      component: {
        name: 'wave.registerName',
        passProps: {
          phone,
          password,
        },
      },
    });
  };

  render() {
    return (
      <AnimatedLinearGradient
        customColors={gradientPreset}
        speed={gradientSpeed}
      >
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
              비밀번호는 영문 숫자 혼합 8자 이상입니다.
            </Text>
            <RegisterForm
              invert
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
      </AnimatedLinearGradient>
    );
  }
}

PasswordScreen.propTypes = {
  componentId: PropTypes.string,
  phone: PropTypes.string,
};

export default PasswordScreen;
