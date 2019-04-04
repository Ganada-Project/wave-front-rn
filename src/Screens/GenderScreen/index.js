import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import styles from './styles';
import { FullWidthButton, GenderBox } from '../../Components';
import { keyboardVerticalOffset, keyboardBehavior } from '../../constants';

const genderData = [
  {
    id: 1,
    name: '남성',
    icon: require('../../Assets/Icons/Register/man.png'),
    iconWhite: require('../../Assets/Icons/Register/man-white.png'),
  },
  {
    id: 2,
    name: '여성',
    icon: require('../../Assets/Icons/Register/woman.png'),
    iconWhite: require('../../Assets/Icons/Register/woman-white.png'),
  },
];

export class GenderScreen extends Component {
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
      selectedGenderId: 0,
    };
  }

  navigateToPoseInfo = () => {
    const {
      componentId, name, nickname, phone, password,
    } = this.props;
    const { selectedGenderId } = this.state;
    const gender = selectedGenderId === 1 ? 'M' : 'W';
    Navigation.push(componentId, {
      component: {
        name: 'wave.poseInfo',
        passProps: {
          gender,
          name,
          nickname,
          phone,
          password,
        },
      },
    });
  };

  handleGender = (id) => {
    this.setState({ selectedGenderId: id });
  };

  render() {
    const { selectedGenderId } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={keyboardBehavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={styles.header}>
          <Text style={styles.header__title}>성별</Text>
        </View>
        <View style={styles.body}>
          {genderData.map((gender) => (
            <GenderBox
              onPress={this.handleGender}
              icon={gender.icon}
              iconWhite={gender.iconWhite}
              id={gender.id}
              selectedGenderId={selectedGenderId}
              key={`gender-${gender.id}`}
              name={gender.name}
              divider={2.5}
            />
          ))}
        </View>
        <View style={styles.footer}>
          <FullWidthButton
            onPress={this.navigateToPoseInfo}
            disabled={selectedGenderId === 0}
            invert
            content="다음 단계"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

GenderScreen.propTypes = {
  componentId: PropTypes.string,
  name: PropTypes.string,
  nickname: PropTypes.string,
  password: PropTypes.string,
  phone: PropTypes.string,
};

export default GenderScreen;
