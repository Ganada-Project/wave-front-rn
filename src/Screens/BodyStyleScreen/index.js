import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import AnimatedGradient from 'react-native-animated-linear-gradient';
import styles, { HeightWeightWrapper, Height, Weight } from './styles';
import { RegisterForm, FullWidthButton, ColorBar } from '../../Components';
import {
  keyboardVerticalOffset,
  keyboardBehavior,
  theme,
  gradientPreset,
  gradientSpeed,
  AuthTopBarOption,
} from '../../constants';

export class BodyStyleScreen extends Component {
  static options() {
    return {
      topBar: {
        ...AuthTopBarOption,
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
      gender, name, age, componentId,
    } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.poseInfo',
        passProps: {
          gender,
          name,
          age,
          height,
          weight,
        },
      },
    });
  };

  onPressColor = ({ colorId }) => {
    console.log(colorId);
  }

  render() {
    const { sizeCardId } = this.props;
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
          <ColorBar onPressColor={this.onPressColor}/>
          {sizeCardId ? <Text>brand recommend</Text> : <Text>fuck</Text>}
        </View>
        <View style={styles.footer}>
          <FullWidthButton
            disabled={!!height === '' || weight === ''}
            onPress={this.navigateToPoseInfo}
            content="다음 단계"
          />
        </View>
      </KeyboardAvoidingView>  
    );
  }
}

BodyStyleScreen.defaultProps = {
  sizeCardId: 1,
}

BodyStyleScreen.propTypes = {
  componentId: PropTypes.string,
  gender: PropTypes.number,
  name: PropTypes.string,
  nickname: PropTypes.string,
  phone: PropTypes.string,
  password: PropTypes.string,
  age: PropTypes.string,
};

export default BodyStyleScreen;
