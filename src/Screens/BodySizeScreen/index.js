import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import styles, { HeightWeightWrapper, Height, Weight } from './styles';
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
      brandsArray,
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
          brandsArray,
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
          <Text style={styles.header__title}>회원님의 신체</Text>
        </View>
        <View style={styles.body}>
          <HeightWeightWrapper>
            <Height>
              <RegisterForm
                label="신장(cm)"
                keyboardType="numeric"
                onChangeText={(text) => this.setState({ height: text })}
              />
            </Height>
            <Weight>
              <RegisterForm
                label="체중(kg)"
                keyboardType="numeric"
                autoFocus={false}
                onChangeText={(text) => this.setState({ weight: text })}
              />
            </Weight>
          </HeightWeightWrapper>
          <RegisterForm
            label="허리둘레(cm)"
            keyboardType="numeric"
            autoFocus={false}
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
  brandsArray: PropTypes.array,
  base64: PropTypes.string,
};

export default BodySizeScreen;
