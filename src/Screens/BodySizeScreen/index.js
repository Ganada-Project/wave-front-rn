import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import styles, { HeightWeightWrapper, Height, Weight } from './styles';
import { RegisterForm, FullWidthButton } from '../../Components';
import {
  keyboardVerticalOffset,
  keyboardBehavior,
  theme,
} from '../../constants';

export class BodySizeScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        noBorder: true,
        background: {
          color: theme.pointColor,
        },
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      height: '',
      weight: '',
    };
  }

  navigateToPoseInfo = () => {
    const { height, weight } = this.state;
    const {
      gender,
      phone,
      name,
      nickname,
      password,
      age,
      componentId,
    } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.poseInfo',
        passProps: {
          phone,
          gender,
          nickname,
          name,
          age,
          password,
          height,
          weight,
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
          <Text style={styles.header__title}>기본 신체정보</Text>
        </View>
        <View style={styles.body}>
          <RegisterForm
            label="신장(cm)"
            keyboardType="numeric"
            onChangeText={(text) => this.setState({ height: text })}
          />
          <RegisterForm
            label="체중(kg)"
            keyboardType="numeric"
            autoFocus={false}
            onChangeText={(text) => this.setState({ weight: text })}
          />
        </View>
        <View style={styles.footer}>
          <FullWidthButton
            disabled={!!height === '' || weight === '' || waist === ''}
            onPress={this.navigateToPoseInfo}
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
  gender: PropTypes.number,
  name: PropTypes.string,
  nickname: PropTypes.string,
  phone: PropTypes.string,
  password: PropTypes.string,
  age: PropTypes.string,
};

export default BodySizeScreen;
