import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { RNCamera } from 'react-native-camera';
import { Attitude, Barometer } from 'react-native-attitude';
// import {
//   gyroscope,
//   setUpdateIntervalForType,
//   SensorTypes,
// } from 'react-native-sensors';
import { Icon } from 'react-native-elements';
import { theme } from '../../constants';
import {
  HeadLine,
  TakeButtonWrapper,
  HeadLabel,
  LabelText,
  HeadLineWrapper,
  FootLineWrapper,
  BellyCenterWrapper,
  BellyLine,
  BellyLabel,
  GuideWrapper,
  GuideBottomWrapper,
  GuideText,
  TakeButton,
  TakeButtonInner,
  DisableButton,
} from './styles';

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

class CameraScreen extends Component {
  static options() {
    return {
      topBar: {
        title: {
          text: '신체촬영',
          color: theme.pointColor,
        },
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = { pitch: 0 };
    this.textOpacityLoop = new Animated.Value(0.2);
  }

  componentDidMount() {
    // setUpdateIntervalForType(SensorTypes.gyroscope, 1000);
    // const subscription = gyroscope.subscribe(({ x, y, z }) => {
    //   this.setState({ x, y, z });
    // });
    // this.setState({ subscription });
    this.attitudeWatchID = Attitude.watchAttitude((update) => {
      this.setState({ pitch: update.attitude.pitch + 90 });
    });
    this.startAnimation();
  }

  componentWillUnmount() {
    // this.state.subscription.unsubscribe();
    Attitude.clearWatchAttitude(this.attitudeWatchID);
    Attitude.stopObserving();
  }

  startAnimation = () => {
    this.textOpacityLoop.setValue(0.2);
    Animated.timing(this.textOpacityLoop, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
    }).start(() => {
      this.startAnimation();
    });
  };

  takePicture = async () => {
    const {
      componentId, height, weight, isMe,
    } = this.props;
    if (this.camera) {
      const options = { quality: 0.1, base64: true };
      const data = await this.camera.takePictureAsync(options);
      const { base64 } = data;
      Navigation.push(componentId, {
        component: {
          name: 'wave.heightSlide',
          passProps: {
            base64,
            height,
            weight,
            isMe,
          },
        },
      });
    }
  };

  render() {
    const {
      x, y, z, pitch,
    } = this.state;
    const allowed = pitch < 100 && pitch > 80;

    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle="카메라 접근 허용"
          permissionDialogMessage="회원님의 휴대폰 카메라 사용을 위해 접근 허용이 필요합니다"
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <GuideWrapper allowed={allowed}>
          <GuideText
            style={{
              opacity: allowed ? 1 : this.textOpacityLoop,
            }}
          >
            {allowed
              ? '정수리와 발 끝을 맞추고 촬영하세요!'
              : '최대한 수직으로 유지해주세요!'}
          </GuideText>
        </GuideWrapper>
        <HeadLineWrapper>
          <HeadLine>
            <HeadLabel>
              <LabelText>정수리</LabelText>
            </HeadLabel>
          </HeadLine>
        </HeadLineWrapper>
        <BellyCenterWrapper>
          <BellyLine>
            {/* <BellyLabel style={{ transform: [{ rotate: '-90deg' }] }}>
              <LabelText>배꼽</LabelText>
            </BellyLabel> */}
          </BellyLine>
        </BellyCenterWrapper>
        <FootLineWrapper>
          <HeadLine>
            <HeadLabel>
              <LabelText>발 끝</LabelText>
            </HeadLabel>
          </HeadLine>
        </FootLineWrapper>
        <GuideBottomWrapper allowed={allowed}>
          <TakeButtonWrapper>
            {allowed ? (
              <TakeButton onPress={this.takePicture}>
                <TakeButtonInner></TakeButtonInner>
              </TakeButton>
            ) : (
              <DisableButton>
                <Icon
                  type="ant-design"
                  name="close"
                  size={40}
                  color={theme.pointColor}
                />
              </DisableButton>
            )}
          </TakeButtonWrapper>
        </GuideBottomWrapper>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 44,
    alignItems: 'center',
  },
});

CameraScreen.propTypes = {
  componentId: PropTypes.string,
  gender: PropTypes.number,
  name: PropTypes.string,
  nickname: PropTypes.string,
  phone: PropTypes.string,
  password: PropTypes.string,
  age: PropTypes.string,
  height: PropTypes.string,
  weight: PropTypes.string,
  isMe: PropTypes.bool,
};

export default CameraScreen;
