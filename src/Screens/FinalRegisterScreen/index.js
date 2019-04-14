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

// react-native-navigation
import { Navigation } from 'react-native-navigation';

import { BarIndicator } from 'react-native-indicators';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// reselect -> reducer에 있는 프로퍼티들 선택 툴
import { createStructuredSelector } from 'reselect';

// injectSaga
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import DAEMON from '../../utils/constants';

// local selectors
import { makeSelectRegisterLoading } from './selectors';

// local action
import { registerUserAction } from './actions';

// local saga
import saga from './saga';
import reducer from './reducer';

// local styles
import styles from './style';

import { theme } from '../../constants';

class FinalRegisterScreen extends Component {
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

  componentDidMount() {
    this.postRegister();
  }

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
      base64,
      componentId,
      headOffset,
      footOffset,
      leftNeckOffset,
      leftShulderOffset,
      leftElbowOffset,
      leftHandOffset,
      rightNeckOffset,
      rightShulderOffset,
      rightElbowOffset,
      rightHandOffset,
      leftChestOffset,
      leftWaistOffset,
      leftPelvisOffset,
      rightChestOffset,
      rightWaistOffset,
      rightPelvisOffset,
      leftThighOffset,
      leftAnkleOffset,
      rightThighOffset,
      rightAnkleOffset,
    } = this.props;

    console.log('성 :', gender);
    console.log('휴대폰번호 :', phone);
    console.log('이름 :', name);
    console.log('닉네임 :', nickname);
    console.log('패스워드 :', password);
    console.log('키 :', height);
    console.log('몸무게 :', weight);
    console.log('이미지 :', base64.length);
    console.log('정수리: ', headOffset);
    console.log('발끝: ', footOffset);
    console.log('왼쪽 목', leftNeckOffset);
    console.log('왼쪽 어깨', leftShulderOffset);
    console.log('왼쪽 팔꿈치', leftElbowOffset);
    console.log('왼쪽 손', leftHandOffset);
    console.log('오른쪽 목', rightNeckOffset);
    console.log('오른쪽 어깨', rightShulderOffset);
    console.log('오른쪽 팔꿈치', rightElbowOffset);
    console.log('오른쪽 손', rightHandOffset);
    console.log('왼쪽 가슴', leftChestOffset);
    console.log('왼쪽 허리', leftWaistOffset);
    console.log('왼쪽 골반', leftPelvisOffset);
    console.log('오른쪽 가슴', rightChestOffset);
    console.log('오른쪽 허리', rightWaistOffset);
    console.log('오른쪽 골반', rightPelvisOffset);
    console.log('왼쪽 허벅지', leftThighOffset);
    console.log('왼쪽 발목', leftAnkleOffset);
    console.log('오른쪽 허벅지', rightThighOffset);
    console.log('오른쪽 발목', rightAnkleOffset);

    // registerUser({
    //   gender,
    //   name,
    //   phone,
    //   nickname,
    //   password,
    //   weight,
    //   height,
    //   waist,
    //   stylesArray,
    //   brandsArray,
    //   componentId,
    //   imageBase: base64,
    // });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BarIndicator size={40} color={theme.pointColor} count={6} />
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
  phone: PropTypes.string,
  base64: PropTypes.string,
  height: PropTypes.string,
  weight: PropTypes.string,
  headOffset: PropTypes.object,
  footOffset: PropTypes.object,
  leftNeckOffset: PropTypes.object,
  leftShulderOffset: PropTypes.object,
  leftElbowOffset: PropTypes.object,
  leftHandOffset: PropTypes.object,
  rightNeckOffset: PropTypes.object,
  rightShulderOffset: PropTypes.object,
  rightElbowOffset: PropTypes.object,
  rightHandOffset: PropTypes.object,
  leftChestOffset: PropTypes.object,
  leftWaistOffset: PropTypes.object,
  leftPelvisOffset: PropTypes.object,
  rightChestOffset: PropTypes.object,
  rightWaistOffset: PropTypes.object,
  rightPelvisOffset: PropTypes.object,
  leftAnkleOffset: PropTypes.object,
  leftThighOffset: PropTypes.object,
  rightAnkleOffset: PropTypes.object,
  rightThighOffset: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  registerLoading: makeSelectRegisterLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: ({
    phone,
    gender,
    name,
    nickname,
    password,
    stylesArray,
    brandsArray,
    imageBase,
    weight,
    height,
    waist,
    componentId,
  }) => dispatch(
    registerUserAction({
      phone,
      gender,
      password,
      name,
      nickname,
      stylesArray,
      brandsArray,
      imageBase,
      weight,
      height,
      waist,
      componentId,
    }),
  ),
});

const withSaga = injectSaga({ key: 'finalRegister', saga });
const withReducer = injectReducer({ key: 'finalRegister', reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withReducer,
  withSaga,
)(FinalRegisterScreen);
