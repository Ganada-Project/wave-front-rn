import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import styles, { GenderWrapper, LabelText } from './styles';
import { FullWidthButton, GenderBox, RegisterForm } from '../../Components';
import {
  keyboardVerticalOffset,
  keyboardBehavior,
  gradientPreset,
  gradientSpeed,
  AuthTopBarOption,
} from '../../constants';

const genderData = [
  {
    id: 2,
    name: '여성',
    icon: require('../../Assets/Icons/Register/woman.png'),
    iconWhite: require('../../Assets/Icons/Register/woman-white.png'),
  },
  {
    id: 1,
    name: '남성',
    icon: require('../../Assets/Icons/Register/man.png'),
    iconWhite: require('../../Assets/Icons/Register/man-white.png'),
  },
];

export class GenderScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        ...AuthTopBarOption,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedGenderId: null,
      age: '',
    };
  }

  navigateToBodySize = () => {
    const {
      componentId, name, nickname, phone, password,
    } = this.props;
    const { selectedGenderId, age } = this.state;
    const gender = selectedGenderId === 1 ? 1 : 0;
    Navigation.push(componentId, {
      component: {
        name: 'wave.bodySize',
        passProps: {
          gender,
          name,
          nickname,
          phone,
          password,
          age,
        },
      },
    });
  };

  handleGender = (id) => {
    this.setState({ selectedGenderId: id });
  };

  render() {
    const { selectedGenderId, age } = this.state;
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
            <Text style={styles.header__title}>개인정보</Text>
          </View>
          <View style={styles.body}>
            <LabelText>성별을 선택해 주세요</LabelText>
            <GenderWrapper>
              {genderData.map((gender) => (
                <GenderBox
                  onPress={this.handleGender}
                  icon={gender.icon}
                  iconWhite={gender.iconWhite}
                  id={gender.id}
                  selectedGenderId={selectedGenderId}
                  key={`gender-${gender.id}`}
                  name={gender.name}
                  divider={4.5}
                />
              ))}
            </GenderWrapper>
            <RegisterForm
              label="나이를 입력해 주세요"
              keyboardType="numeric"
              onChangeText={(text) => this.setState({ age: text })}
            />
          </View>
          <View style={styles.footer}>
            <FullWidthButton
              onPress={this.navigateToBodySize}
              disabled={selectedGenderId === 0 || age === ''}
              invert
              content="다음 단계"
            />
          </View>
        </KeyboardAvoidingView>
      </AnimatedLinearGradient>
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
