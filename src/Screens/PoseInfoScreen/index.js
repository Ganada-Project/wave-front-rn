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
              <Text>굳바이</Text>
            </View>
            <View style={styles.swiper__descArea}>
              <Text style={styles.swiper__headerInfo}>앞 모습 전신을 촬영</Text>
            </View>
          </View>
          <View style={styles.swiper__container}>
            <Text style={styles.swiper__headerInfo}>
              자세는 이렇게 하면 좋아요.
            </Text>
            <Text style={styles.swiper__subInfo}>
              손바닥을 카메라에 보여주세요.
            </Text>
            <Image
              style={styles.guideImage}
              source={require('./images/guide2.png')}
            />
            <Text style={{ ...styles.swiper__subInfo, textAlign: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>허리를 펴고 </Text>
              서있어야 더 정확해 집니다.
            </Text>
          </View>
          <View style={styles.swiper__container}>
            <Text style={styles.swiper__headerInfo}>
              간편하게 지정된 부위를 짚어주세요.
            </Text>
            <Text style={styles.swiper__subInfo}>
              얇은 옷을 입는 걸 추천해요.
            </Text>
            <Image
              style={styles.guideImage}
              source={require('./images/guide3.png')}
            />
            <Text style={{ ...styles.swiper__subInfo, textAlign: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>물음표를 누르면 </Text>
              가이드 화면이 나타납니다.
            </Text>
          </View>
          <View style={styles.swiper__container}>
            <Text style={styles.swiper__headerInfo}>
              치수는 자동으로 계산됩니다.
            </Text>

            <Image
              style={styles.guideImage}
              source={require('./images/guide4.png')}
            />
            <Text style={{ ...styles.swiper__subInfo, textAlign: 'center' }}>
              측정되는 신체 치수는
              <Text style={{ fontWeight: 'bold' }}> 비공개</Text>
              입니다
            </Text>
            <View style={styles.footer}>
              <FullWidthButton
                onPress={this.navigateToCamera}
                invert
                content="촬영하기"
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
