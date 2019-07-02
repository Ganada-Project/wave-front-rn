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
import SizeCardAddButton from './SizeCardAddButton';

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

  navigateToInfo1 = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'wave.registerName',
            },
          },
        ],
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
            {/* <Text style={styles.header__title}>웨어비</Text> */}
            <Text style={styles.header__title}>혹시 아시나요?</Text>
            <Text style={styles.header__subtitle}>
              패션 브랜드마다 사이즈 측정법이 다르데요.
            </Text>
          </View>
          <View style={styles.footer}>
            <SizeCardAddButton onPressAdd={this.navigateToInfo1} />
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
