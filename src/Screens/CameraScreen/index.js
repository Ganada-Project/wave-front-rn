import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { RNCamera } from 'react-native-camera';
import { gyroscope } from 'react-native-sensors';
import { Button } from 'react-native-elements';
import { HeadLine, FootLine, TakeButtonWrapper } from './styles';

class CameraScreen extends Component {
  static options(passProps) {
    return {
      topBar: {},
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  takePicture = async () => {
    const {
      componentId,
      name,
      nickname,
      phone,
      gender,
      password,
      age,
      height,
      weight,
    } = this.props;
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      const { base64 } = data;
      Navigation.push(componentId, {
        component: {
          name: 'wave.heightSlide',
          passProps: {
            phone,
            gender,
            age,
            nickname,
            name,
            password,
            base64,
            height,
            weight,
          },
        },
      });
    }
  };

  render() {
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
        <HeadLine />
        <FootLine />
        <TakeButtonWrapper>
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
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

CameraScreen.propTypes = {
  componentId: PropTypes.string,
  gender: PropTypes.string,
  name: PropTypes.string,
  nickname: PropTypes.string,
  phone: PropTypes.string,
  password: PropTypes.string,
  age: PropTypes.string,
  height: PropTypes.string,
  weight: PropTypes.string,
};

export default CameraScreen;
