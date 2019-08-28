import React, { Component, Fragment } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import styles, { HeightWeightWrapper, Height, Weight } from './styles';
import { RegisterForm, FullWidthButton, GenderBox } from '../../Components';
import {
  keyboardVerticalOffset,
  keyboardBehavior,
  theme,
  gradientPreset,
  gradientSpeed,
  AuthTopBarOption,
} from '../../constants';

const genderData = [
  {
    id: 0,
    name: '여성',
    icon: require('../../Assets/Icons/Register/woman.png'), //eslint-disable-line
    iconWhite: require('../../Assets/Icons/Register/woman-white.png'), //eslint-disable-line
  },
  {
    id: 1,
    name: '남성',
    icon: require('../../Assets/Icons/Register/man.png'), //eslint-disable-line
    iconWhite: require('../../Assets/Icons/Register/man-white.png'), //eslint-disable-line
  },
];

export class SizeCardInfoScreen extends Component {
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
      sizeCardName: '',
      age: '',
      selectedGenderId: null,
    };
  }

  navigateToFinalRegister = () => {
    const {
      componentId,
      height,
      weight,
      base64,
      headOffset,
      footOffset,
      leftNeckOffset,
      leftShulderOffset,
      leftElbowOffset,
      leftHandOffset,
      rightNeckOffset,
      rightShulderOffset,
      rightElbowOffset,
      rightHandOffset,
      leftChestOffset,
      leftWaistOffset,
      leftPelvisOffset,
      rightChestOffset,
      rightWaistOffset,
      rightPelvisOffset,
      leftThighOffset,
      leftAnkleOffset,
      rightThighOffset,
      rightAnkleOffset,
    } = this.props;
    const { sizeCardName, selectedGenderId, age } = this.state;
    Navigation.push(componentId, {
      component: {
        name: 'wave.finalRegister',
        passProps: {
          sizeCardName,
          gender: selectedGenderId,
          age,
          height,
          weight,
          base64,
          headOffset,
          footOffset,
          leftNeckOffset,
          leftShulderOffset,
          leftElbowOffset,
          leftHandOffset,
          rightNeckOffset,
          rightShulderOffset,
          rightElbowOffset,
          rightHandOffset,
          leftChestOffset,
          leftWaistOffset,
          leftPelvisOffset,
          rightChestOffset,
          rightWaistOffset,
          rightPelvisOffset,
          leftThighOffset,
          leftAnkleOffset,
          rightThighOffset,
          rightAnkleOffset,
        },
      },
    });
  };

  handleGender = (id) => {
    this.setState({ selectedGenderId: id });
  };

  render() {
    const { isMe } = this.props;
    const { sizeCardName, age, selectedGenderId } = this.state;

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
            label="사이즈카드 이름"
            onChangeText={(text) => this.setState({ sizeCardName: text })}
          />
          {!isMe ? (
            <Fragment>
              <RegisterForm
                label="나이"
                keyboardType="numeric"
                autoFocus={false}
                onChangeText={(text) => this.setState({ age: text })}
              />
              <View style={{ flexDirection: 'row' }}>
                {genderData.map((gender) => (
                  <GenderBox
                    onPress={this.handleGender}
                    icon={gender.icon}
                    iconWhite={gender.iconWhite}
                    id={gender.id}
                    selectedGenderId={selectedGenderId}
                    key={`gender-${gender.id}`}
                    name={gender.name}
                    divider={6.5}
                  />
                ))}
              </View>
            </Fragment>
          ) : null}
        </View>
        <View style={styles.footer}>
          <FullWidthButton
            disabled={
              isMe
                ? !!sizeCardName === ''
                : !!sizeCardName === ''
                  || age === ''
                  || selectedGenderId === null
            }
            onPress={this.navigateToFinalRegister}
            content="다음 단계"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

SizeCardInfoScreen.propTypes = {
  componentId: PropTypes.string,
  isMe: PropTypes.bool,
  base64: PropTypes.string,
  height: PropTypes.string,
  weight: PropTypes.string,
  headOffset: PropTypes.object,
  footOffset: PropTypes.object,
  leftNeckOffset: PropTypes.object,
  leftShulderOffset: PropTypes.object,
  leftElbowOffset: PropTypes.object,
  leftHandOffset: PropTypes.object,
  rightNeckOffset: PropTypes.object,
  rightShulderOffset: PropTypes.object,
  rightElbowOffset: PropTypes.object,
  rightHandOffset: PropTypes.object,
  leftChestOffset: PropTypes.object,
  leftWaistOffset: PropTypes.object,
  leftPelvisOffset: PropTypes.object,
  rightChestOffset: PropTypes.object,
  rightWaistOffset: PropTypes.object,
  rightPelvisOffset: PropTypes.object,
  leftAnkleOffset: PropTypes.object,
  leftThighOffset: PropTypes.object,
  rightAnkleOffset: PropTypes.object,
  rightThighOffset: PropTypes.object,
};

export default SizeCardInfoScreen;
