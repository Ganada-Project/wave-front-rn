import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { RNCamera } from 'react-native-camera';

class CameraScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
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
      stylesArray,
      brandsArray,
    } = this.props;
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data);
      const { base64 } = data;
      Navigation.push(componentId, {
        component: {
          name: 'wave.bodySlider',
          passProps: {
            phone,
            gender,
            nickname,
            name,
            password,
            stylesArray,
            brandsArray,
            base64,
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
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View
          style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}
        >
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
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
  stylesArray: PropTypes.array,
  brandsArray: PropTypes.array,
};

export default CameraScreen;
