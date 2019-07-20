import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import AnimatedGradient from 'react-native-animated-linear-gradient';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { FullWidthButton } from '../../Components';
import {
  theme,
  gradientPreset,
  gradientSpeed,
  InvertOption,
} from '../../constants';

class PoseInfoScreen extends Component {
  static options() {
    return {
      topBar: {
        ...InvertOption,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
  }

  navigateToCamera = () => {
    const {
      componentId,
      name,
      nickname,
      phone,
      gender,
      password,
      height,
      weight,
      age,
    } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.camera',
        passProps: {
          phone,
          gender,
          nickname,
          age,
          name,
          password,
          height,
          weight,
        },
      },
    });
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'poseInfoSkipButton') {
      const {
        componentId,
        name,
        nickname,
        phone,
        age,
        gender,
        password,
      } = this.props;
      Navigation.push(componentId, {
        component: {
          name: 'wave.bodySize',
          passProps: {
            phone,
            gender,
            age,
            nickname,
            name,
            password,
          },
        },
      });
    }
  }

  render() {
    return (
      <AnimatedGradient customColors={gradientPreset} speed={gradientSpeed}>
        <Swiper
          activeDot={(
            <LinearGradient
              style={styles.activeDot}
              colors={gradientPreset}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          )}
        >
          <View style={styles.swiper__container}>
            <View style={styles.swiper__imageArea}>
              <Image
                style={styles.guideImage}
                resizeMode="contain"
                source={require('./images/guide1.png')}
              />
            </View>
            <View style={styles.swiper__descArea}>
              <Text style={styles.swiper__headerInfo}>앞 모습 전신을 촬영</Text>
            </View>
          </View>
          <View style={styles.swiper__container}>
            <View style={styles.swiper__imageArea}>
              <Image
                resizeMode="contain"
                style={styles.guideImage}
                source={require('./images/guide2.png')}
              />
            </View>
            <View style={styles.swiper__descArea}>
              <Text style={styles.swiper__headerInfo}>
                카메라는 90으로 유지
              </Text>
            </View>
          </View>
          <View style={styles.swiper__container}>
            <View style={styles.swiper__imageArea}>
              <Image
                style={styles.guideImage}
                resizeMode="contain"
                source={require('./images/guide3.png')}
              />
            </View>
            <View style={styles.swiper__descArea}>
              <Text style={styles.swiper__headerInfo}>재미난 시간</Text>
            </View>
          </View>
          <View style={styles.swiper__container}>
            <View style={styles.swiper__imageArea}>
              <Image
                style={styles.guideImage}
                resizeMode="contain"
                source={require('./images/guide4.png')}
              />
            </View>
            <View style={styles.swiper__descArea}>
              <Text style={styles.swiper__headerInfo}>친절한 웨어비</Text>
            </View>
          </View>
          <View style={styles.swiper__container}>
            <View style={styles.swiper__imageArea}>
              <Image
                style={styles.guideImage}
                resizeMode="contain"
                source={require('./images/guide5.png')}
              />
            </View>
            <View style={styles.swiper__descArea}>
              <Text style={styles.swiper__headerInfo}>자동으로 치수 계산</Text>
              <FullWidthButton
                content="다음 단계"
                onPress={this.navigateToCamera}
              />
            </View>
          </View>
        </Swiper>
      </AnimatedGradient>
    );
  }
}

PoseInfoScreen.propTypes = {
  componentId: PropTypes.string,
  gender: PropTypes.number,
  name: PropTypes.string,
  nickname: PropTypes.string,
  phone: PropTypes.string,
  password: PropTypes.string,
  height: PropTypes.string,
  weight: PropTypes.string,
  age: PropTypes.string,
};

export default PoseInfoScreen;
