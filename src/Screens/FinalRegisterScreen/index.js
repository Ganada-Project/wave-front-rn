/**
 * Author: ShinHyunJong
 * Redux & Saga connected index.js
 * Copyright: Ganada Project
 */
import React, { Component } from 'react';

// prop-types
import PropTypes from 'prop-types';

// react-native
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';

// react-native-photo-upload
import PhotoUpload from 'react-native-photo-upload';

// react-native-navigation
import { Navigation } from 'react-native-navigation';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// reselect -> reducer에 있는 프로퍼티들 선택 툴
import { createStructuredSelector } from 'reselect';

// injectSaga
import injectSaga from '../../utils/injectSaga';
import DAEMON from '../../utils/constants';

// local selectors
import {} from './selectors';

// local action
import { registerUserAction } from './actions';

// local saga
import saga from './saga';

// local styles
import styles from './style';

class FinalRegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBase: '',
      isUploaded: false,
    };
    Navigation.events().bindComponent(this);
  }

  navigateTo = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.app',
        options: {
          topBar: {
            title: {
              text: 'sample',
            },
          },
        },
      },
    });
  };

  handlePhoto = (avatar) => {
    if (avatar) {
      this.setState({ imageBase: avatar, isUploaded: true });
    }
  };

  postRegister = () => {
    const {
      registerUser,
      gender,
      phone,
      name,
      nickname,
      password,
      weight,
      height,
      waist,
      stylesArray,
    } = this.props;
    const { imageBase } = this.state;

    registerUser({
      gender,
      name,
      phone,
      nickname,
      password,
      weight,
      height,
      waist,
      stylesArray,
      imageBase,
    });
  };

  render() {
    const { isUploaded, imageBase } = this.state;
    console.log(imageBase);
    return (
      <View>
        <PhotoUpload onPhotoSelect={this.handlePhoto}>
          <Image
            style={{
              paddingVertical: 30,
              width: 150,
              height: 150,
              borderRadius: 75,
            }}
            resizeMode="cover"
            source={{
              uri: !isUploaded
                ? 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                : imageBase,
            }}
          />
        </PhotoUpload>
        <TouchableOpacity onPress={this.postRegister}>
          <Text>전송하기</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

FinalRegisterScreen.propTypes = {
  componentId: PropTypes.string,
  registerUser: PropTypes.func,
  gender: PropTypes.string,
  name: PropTypes.string,
  password: PropTypes.string,
  nickname: PropTypes.string,
  stylesArray: PropTypes.array,
  weight: PropTypes.number,
  height: PropTypes.number,
  waist: PropTypes.number,
  phone: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  registerUser: ({
    phone,
    gender,
    name,
    nickname,
    password,
    stylesArray,
    imageBase,
    weight,
    height,
    waist,
  }) => dispatch(
    registerUserAction({
      phone,
      gender,
      password,
      name,
      nickname,
      stylesArray,
      imageBase,
      weight,
      height,
      waist,
    }),
  ),
});

const withSaga = injectSaga({ key: 'finalRegister', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withSaga,
)(FinalRegisterScreen);
