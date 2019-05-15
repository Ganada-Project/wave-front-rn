import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, Image, Alert,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import RNKakaoLogins from 'react-native-kakao-logins';
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
    this.state = {
      isKakaoLogging: false,
      token: 'token has not fetched',
      profile: null,
    };
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

  kakaoLogin = () => {
    console.log('   kakaoLogin   ');
    RNKakaoLogins.login((err, result) => {
      if (err) {
        console.log(JSON.stringify(err));
        return;
      }
      this.setState({ token: result.token }, () => {
        this.getProfile();
      });
    });
  };

  getProfile = () => {
    console.log('getKakaoProfile');
    RNKakaoLogins.getProfile((err, result) => {
      if (err) {
        console.log(err.toString());
        return;
      }
      this.setState({ profile: result });
    });
  };

  render() {
    console.log(this.state.token);
    console.log(this.state.profile);
    return (
      <AnimatedLinearGradient
        customColors={gradientPreset}
        speed={gradientSpeed}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.logo} source={WaveLogoWhite} />
            <Text style={styles.header__title}>웨어비</Text>
            <Text style={styles.header__subtitle}>
              이제는 나만의 옷장을 구독하세요.
            </Text>
          </View>
          <View style={styles.footer}>
            <FullWidthButton
              icon="phone"
              invert
              content="휴대번호로 로그인"
              onPress={this.navigateToSignIn}
            />
            <FullWidthButton
              icon="facebook-f"
              content="카카오로 로그인"
              onPress={this.kakaoLogin}
            />
            <Button
              title="회원가입"
              type="clear"
              titleStyle={styles.registerText}
              onPress={this.navigateToGender}
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
