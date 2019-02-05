import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import styles from './styles';
import { RegisterForm, FullWidthButton } from '../../Components';
import { keyboardVerticalOffset, keyboardBehavior } from '../../constants';

export class BodySizeScreen extends Component {
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
      height: '',
      weight: '',
      waist: '',
    };
  }

  navigateTofinalRegister = () => {
    const { height, weight, waist } = this.state;
    const {
      gender,
      phone,
      name,
      nickname,
      password,
      stylesArray,
      base64,
      componentId,
    } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.finalRegister',
        passProps: {
          phone,
          gender,
          nickname,
          name,
          password,
          stylesArray,
          base64,
          height,
          weight,
          waist,
        },
      },
    });
  };

  render() {
    const { height, weight, waist } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={keyboardBehavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={styles.header}>
          <Text style={styles.header__title}>신체치수를 알려주세요.</Text>
        </View>
        <View style={styles.body}>
          <RegisterForm
            label="신장(cm)"
            onChangeText={(text) => this.setState({ height: text })}
          />
          <RegisterForm
            label="체중(kg)"
            onChangeText={(text) => this.setState({ weight: text })}
          />
          <RegisterForm
            label="허리둘레(cm)"
            onChangeText={(text) => this.setState({ waist: text })}
          />
        </View>
        <View style={styles.footer}>
          <FullWidthButton
            disabled={!!height === '' || weight === '' || waist === ''}
            onPress={this.navigateTofinalRegister}
            invert
            content="다음 단계"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

BodySizeScreen.propTypes = {
  componentId: PropTypes.string,
  gender: PropTypes.string,
  name: PropTypes.string,
  nickname: PropTypes.string,
  phone: PropTypes.string,
  password: PropTypes.string,
  stylesArray: PropTypes.array,
  base64: PropTypes.string,
};

export default BodySizeScreen;
