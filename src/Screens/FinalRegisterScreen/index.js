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
import { postSizeCardAction } from './actions';

// local saga
import saga from './saga';
import reducer from './reducer';

// local styles
import styles from './style';

import { theme } from '../../constants';
import { makeSelectUser } from '../App/selectors';

class FinalRegisterScreen extends Component {
  static options() {
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
    // this.postRegister();
  }

  postRegister = () => {
    const {
      postSizeCard,
      gender,
      sizeCardName,
      user,
      age,
      height,
      weight,
      base64,
      headOffsetY,
      footOffsetY,
      bellyOffsetX,
      shulderOffsetY,
      wristOffsetY,
      crotchOffsetY,
      pelvisOffsetY,
      ankleOffsetY,
      leftShulderOffsetX,
      leftChestOffsetX,
      leftWaistOffsetX,
      leftPelvisOffsetX,
      rightShulderOffsetX,
      rightChestOffsetX,
      rightWaistOffsetX,
      rightPelvisOffsetX,
    } = this.props;

    postSizeCard({
      gender: gender || user.get('gender'),
      sizeCardName,
      age: age || user.get('age'),
      weight,
      height,
      // headOffset,
      // footOffset,
      // leftShulderOffset,
      // rightNeckOffset,
      // rightShulderOffset,
      // rightElbowOffset,
      // rightHandOffset,
      // leftChestOffset,
      // leftWaistOffset,
      // leftPelvisOffset,
      // rightChestOffset,
      // rightWaistOffset,
      // rightPelvisOffset,
      // leftThighOffset,
      // leftAnkleOffset,
      // rightThighOffset,
      // rightAnkleOffset,
      // componentId,
      imageBase: base64,
    });
  };

  render() {
    const {
      postSizeCard,
      gender,
      sizeCardName,
      user,
      age,
      height,
      weight,
      base64,
      headOffsetY,
      footOffsetY,
      bellyOffsetX,
      shoulderOffsetY,
      wristOffsetY,
      crotchOffsetY,
      pelvisOffsetY,
      ankleOffsetY,
      leftShulderOffsetX,
      leftChestOffsetX,
      leftWaistOffsetX,
      leftPelvisOffsetX,
      rightShulderOffsetX,
      rightChestOffsetX,
      rightWaistOffsetX,
      rightPelvisOffsetX,
    } = this.props;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Text>{`성: ${gender || user.get('gender')}`}</Text>
        <Text>{`사이즈카드이름: ${sizeCardName}`}</Text>
        <Text>{`키: ${height}`}</Text>
        <Text>{`체중: ${weight}`}</Text>
        <Text>{`나이: ${age || user.get('age')}`}</Text>
        <Text>{`머리: ${headOffsetY}`}</Text>
        <Text>{`발: ${footOffsetY}`}</Text>
        <Text>{`배꼽x: ${bellyOffsetX}`}</Text>
        <Text>{`어깨y: ${shoulderOffsetY}`}</Text>
        <Text>{`골반y: ${pelvisOffsetY}`}</Text>
        <Text>{`손목: ${wristOffsetY}`}</Text>
        <Text>{`밑위y: ${crotchOffsetY}`}</Text>
        <Text>{`발목y:  ${ankleOffsetY}`}</Text>
        <Text>{`왼쪽어깨X: ${leftShulderOffsetX}`}</Text>
        <Text>{`오른쪽어깨X: ${rightShulderOffsetX}`}</Text>
        <Text>{`왼쪽가슴X: ${leftChestOffsetX}`}</Text>
        <Text>{`오른쪽가슴X: ${rightChestOffsetX}`}</Text>
        <Text>{`왼쪽골반X: ${leftPelvisOffsetX}`}</Text>
        <Text>{`오른쪽골반X: ${rightPelvisOffsetX}`}</Text>
        <Text>{`왼쪽허리X: ${leftWaistOffsetX}`}</Text>
        <Text>{`오른쪽허리X: ${rightWaistOffsetX}`}</Text>
        {/* <BarIndicator size={40} color={theme.pointColor} count={6} /> */}
      </View>
    );
  }
}

FinalRegisterScreen.propTypes = {
  componentId: PropTypes.string,
  sizeCardName: PropTypes.string,
  postSizeCard: PropTypes.func,
  gender: PropTypes.number,
  age: PropTypes.string,
  base64: PropTypes.string,
  height: PropTypes.string,
  weight: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  registerLoading: makeSelectRegisterLoading(),
  user: makeSelectUser(),
});

const mapDispatchToProps = (dispatch) => ({
  postSizeCard: ({
    gender,
    sizeCardName,
    age,
    password,
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
    imageBase,
    weight,
    height,
    componentId,
  }) => dispatch(
    postSizeCardAction({
      gender,
      password,
      sizeCardName,
      age,
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
      imageBase,
      weight,
      height,
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
