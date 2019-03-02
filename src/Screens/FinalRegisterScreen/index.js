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
      waist,
      stylesArray,
      brandsArray,
      base64,
      componentId,
    } = this.props;

    console.log('성 :', gender);
    console.log('휴대폰번호 :', phone);
    console.log('이름 :', name);
    console.log('닉네임 :', nickname);
    console.log('패스워드 :', password);
    console.log('몸무게 :', weight);
    console.log('키 :', height);
    console.log('허리 :', waist);
    console.log('스타일 :', stylesArray);
    console.log('브랜드', brandsArray);
    console.log('이미지 :', base64);

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
  stylesArray: PropTypes.array,
  brandsArray: PropTypes.array,
  weight: PropTypes.string,
  height: PropTypes.string,
  waist: PropTypes.string,
  phone: PropTypes.string,
  base64: PropTypes.string,
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
