import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, StyleSheet, Dimensions,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { RNCamera } from 'react-native-camera';
import { Attitude, Barometer } from 'react-native-attitude';
// import {
//   gyroscope,
//   setUpdateIntervalForType,
//   SensorTypes,
// } from 'react-native-sensors';
import { Button } from 'react-native-elements';
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
          text: '신장',
          color: theme.pointColor,
        },
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = { pitch: 0 };
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
  }

  componentWillUnmount() {
    // this.state.subscription.unsubscribe();
    Attitude.clearWatchAttitude(this.attitudeWatchID);
  }

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
        <TakeButtonWrapper>
          <Text>{pitch}</Text>
          <Button title="촬영" onPress={this.takePicture} />
        </TakeButtonWrapper>
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
