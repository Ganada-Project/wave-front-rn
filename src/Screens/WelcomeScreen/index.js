import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import styles from './styles';
import { FullWidthButton } from '../../Components';
import { gradientPreset, gradientSpeed } from '../../constants';
import WaveLogoWhite from '../../Assets/Logos/wave-logo-white.png';

export class WelcomeScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
      statusBar: {
        style: 'light',
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateToGender = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.phoneVerify',
      },
    });
  };

  navigateToSignIn = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.signIn',
      },
    });
  };

  render() {
    return (
      <AnimatedLinearGradient
        customColors={gradientPreset}
        speed={gradientSpeed}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.logo} source={WaveLogoWhite} />
            <Text style={styles.header__title}>Hangerfly</Text>
            <Text style={styles.header__subtitle}>
              이제는 나만의 옷장을 구독하세요.
            </Text>
          </View>
          <View style={styles.footer}>
            <FullWidthButton icon="facebook-f" content="페이스북으로 로그인" />
            <FullWidthButton
              icon="phone"
              invert
              content="휴대번호로 로그인"
              onPress={this.navigateToSignIn}
            />
            <Button
              onPress={this.navigateToGender}
              title="회원가입"
              type="clear"
              titleStyle={styles.registerText}
            />
          </View>
        </View>
      </AnimatedLinearGradient>
    );
  }
}

WelcomeScreen.propTypes = {
  componentId: PropTypes.string,
};

export default WelcomeScreen;
