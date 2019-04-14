/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanResponder, Animated } from 'react-native';
import { Navigation } from 'react-native-navigation';
import FastImage from 'react-native-fast-image';
import { Button, Icon } from 'react-native-elements';
import {
  Container,
  ImageContainer,
  MagnifierContainer,
  Slider,
  MagnifierImage,
  MagifierCross,
  MagnifierWrapper,
  MagnifierText,
  HelpWrapper,
  GuideImage,
} from './styles';
import { outputX, outputY, distanceBetween2Offset } from './utils/calculate';
import {
  LEFT_SHULDER_OFFSET,
  LEFT_ELBOW_OFFSET,
  LEFT_HAND_OFFSET,
  LEFT_NECK_OFFSET,
  RIGHT_NECK_OFFSET,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  SLIDER_SCALE,
  RIGHT_SHULDER_OFFSET,
  RIGHT_ELBOW_OFFSET,
  RIGHT_HAND_OFFSET,
} from './constants';
import { theme } from '../../constants';

export class ShulderArmSlideScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '어깨/팔',
          color: theme.pointColor,
        },
        noBorder: true,
        rightButtons: [
          {
            id: 'next',
            text: '다음',
          },
        ],
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      type: null,
      typeText: '',
      leftShulderOffset: {
        x: LEFT_SHULDER_OFFSET.x,
        y: LEFT_SHULDER_OFFSET.y,
      },
      leftElbowOffset: {
        x: LEFT_ELBOW_OFFSET.x,
        y: LEFT_ELBOW_OFFSET.y,
      },
      leftHandOffset: {
        x: LEFT_HAND_OFFSET.x,
        y: LEFT_HAND_OFFSET.y,
      },
      leftNeckOffset: {
        x: LEFT_NECK_OFFSET.x,
        y: LEFT_NECK_OFFSET.y,
      },
      rightNeckOffset: {
        x: RIGHT_NECK_OFFSET.x,
        y: RIGHT_NECK_OFFSET.y,
      },
      rightShulderOffset: {
        x: RIGHT_SHULDER_OFFSET.x,
        y: RIGHT_SHULDER_OFFSET.y,
      },
      rightElbowOffset: {
        x: RIGHT_ELBOW_OFFSET.x,
        y: RIGHT_ELBOW_OFFSET.y,
      },
      rightHandOffset: {
        x: RIGHT_HAND_OFFSET.x,
        y: RIGHT_HAND_OFFSET.y,
      },
    };
    Navigation.events().bindComponent(this);
    // 왼쪽 어깨
    this.leftShulderPan = new Animated.ValueXY();
    this.leftShulderScale = new Animated.Value(1);
    // 왼쪽 팔꿈치
    this.leftElbowPan = new Animated.ValueXY();
    this.leftElbowScale = new Animated.Value(1);
    // 왼쪽 손
    this.leftHandPan = new Animated.ValueXY();
    this.leftHandScale = new Animated.Value(1);
    // 왼쪽 목
    this.leftNeckPan = new Animated.ValueXY();
    this.leftNeckScale = new Animated.Value(1);
    // 오른쪽 목
    this.rightNeckPan = new Animated.ValueXY();
    this.rightNeckScale = new Animated.Value(1);
    // 오른쪽 어깨
    this.rightShulderPan = new Animated.ValueXY();
    this.rightShulderScale = new Animated.Value(1);
    // 오른쪽 팔꿈치
    this.rightElbowPan = new Animated.ValueXY();
    this.rightElbowScale = new Animated.Value(1);
    // 오른쪽 손
    this.rightHandPan = new Animated.ValueXY();
    this.rightHandScale = new Animated.Value(1);
    // 돋보기 투명도
    this.magnifierOpacity = new Animated.Value(0);
    // 가이드 투명도
    this.guideOpacity = new Animated.Value(0);
    const {
      leftShulderScale,
      leftElbowScale,
      leftHandScale,
      leftNeckScale,
      rightNeckScale,
      rightShulderScale,
      rightElbowScale,
      rightHandScale,
      magnifierOpacity,
      guideOpacity,
    } = this;
    // 가이드 버튼
    this.guideResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        Animated.timing(guideOpacity, {
          toValue: 0.8,
        }).start();
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: () => {
        Animated.timing(guideOpacity, {
          toValue: 0,
        }).start();
      },
      onPanResponderTerminate: () => {
        Animated.timing(guideOpacity, {
          toValue: 0,
        }).start();
      },
      onShouldBlockNativeResponder: () => true,
    });
    // 왼쪽 어깨 슬라이더 이벤트
    this.leftShulderPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.leftShulderPan.setOffset({
          x: this.leftShulderPan.x._value,
          y: this.leftShulderPan.y._value,
        });
        this.leftShulderPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(leftShulderScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'leftShulder', typeText: '왼쪽 어깨' });
      },
      onPanResponderMove: this.onDraggingLeftShulder(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.leftShulderPan.flattenOffset();
        Animated.parallel([
          Animated.spring(leftShulderScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          leftShulderOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 왼쪽 팔꿈치 슬라이더 이벤트
    this.leftElbowPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.leftElbowPan.setOffset({
          x: this.leftElbowPan.x._value,
          y: this.leftElbowPan.y._value,
        });
        this.leftElbowPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(leftElbowScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'leftElbow', typeText: '왼쪽 팔꿈치' });
      },
      onPanResponderMove: this.onDraggingLeftElbow(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.leftElbowPan.flattenOffset();
        Animated.parallel([
          Animated.spring(leftElbowScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          leftElbowOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 왼쪽 손 슬라이더 이벤트
    this.leftHandPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.leftHandPan.setOffset({
          x: this.leftHandPan.x._value,
          y: this.leftHandPan.y._value,
        });
        this.leftHandPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(leftHandScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'leftHand', typeText: '왼쪽 손' });
      },
      onPanResponderMove: this.onDraggingLeftHand(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.leftHandPan.flattenOffset();
        Animated.parallel([
          Animated.spring(leftHandScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          leftHandOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 왼쪽 목 슬라이더 이벤트
    this.leftNeckPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.leftNeckPan.setOffset({
          x: this.leftNeckPan.x._value,
          y: this.leftNeckPan.y._value,
        });
        this.leftNeckPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(leftNeckScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'leftNeck', typeText: '왼쪽 목' });
      },
      onPanResponderMove: this.onDraggingLeftNeck(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.leftNeckPan.flattenOffset();
        Animated.parallel([
          Animated.spring(leftNeckScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          leftNeckOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 오른쪽 목 슬라이더 이벤트
    this.rightNeckPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.rightNeckPan.setOffset({
          x: this.rightNeckPan.x._value,
          y: this.rightNeckPan.y._value,
        });
        this.rightNeckPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(rightNeckScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'rightNeck', typeText: '오른쪽 목' });
      },
      onPanResponderMove: this.onDraggingRightNeck(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.rightNeckPan.flattenOffset();
        Animated.parallel([
          Animated.spring(rightNeckScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          rightNeckOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 오른쪽 어깨 슬라이더 이벤트
    this.rightShulderPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.rightShulderPan.setOffset({
          x: this.rightShulderPan.x._value,
          y: this.rightShulderPan.y._value,
        });
        this.rightShulderPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(rightShulderScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'rightShulder', typeText: '오른쪽 어깨' });
      },
      onPanResponderMove: this.onDraggingRightShulder(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.rightShulderPan.flattenOffset();
        Animated.parallel([
          Animated.spring(rightShulderScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          rightShulderOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 오른쪽 팔꿈치 슬라이더 이벤트
    this.rightElbowPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.rightElbowPan.setOffset({
          x: this.rightElbowPan.x._value,
          y: this.rightElbowPan.y._value,
        });
        this.rightElbowPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(rightElbowScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'rightElbow', typeText: '오른쪽 팔꿈치' });
      },
      onPanResponderMove: this.onDraggingRightElbow(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.rightElbowPan.flattenOffset();
        Animated.parallel([
          Animated.spring(rightElbowScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          rightElbowOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 오른쪽 손 슬라이더 이벤트
    this.rightHandPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.rightHandPan.setOffset({
          x: this.rightHandPan.x._value,
          y: this.rightHandPan.y._value,
        });
        this.rightHandPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(rightHandScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'rightHand', typeText: '오른쪽 손' });
      },
      onPanResponderMove: this.onDraggingRightHand(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.rightHandPan.flattenOffset();
        Animated.parallel([
          Animated.spring(rightHandScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          rightHandOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
  }

  onDraggingLeftShulder = () => {
    const { leftShulderPan } = this;
    return Animated.event([
      null,
      { dx: leftShulderPan.x, dy: leftShulderPan.y },
    ]);
  };

  onDraggingLeftElbow = () => {
    const { leftElbowPan } = this;
    return Animated.event([null, { dx: leftElbowPan.x, dy: leftElbowPan.y }]);
  };

  onDraggingLeftHand = () => {
    const { leftHandPan } = this;
    return Animated.event([null, { dx: leftHandPan.x, dy: leftHandPan.y }]);
  };

  onDraggingLeftNeck = () => {
    const { leftNeckPan } = this;
    return Animated.event([null, { dx: leftNeckPan.x, dy: leftNeckPan.y }]);
  };

  onDraggingRightNeck = () => {
    const { rightNeckPan } = this;
    return Animated.event([null, { dx: rightNeckPan.x, dy: rightNeckPan.y }]);
  };

  onDraggingRightShulder = () => {
    const { rightShulderPan } = this;
    return Animated.event([
      null,
      { dx: rightShulderPan.x, dy: rightShulderPan.y },
    ]);
  };

  onDraggingRightElbow = () => {
    const { rightElbowPan } = this;
    return Animated.event([null, { dx: rightElbowPan.x, dy: rightElbowPan.y }]);
  };

  onDraggingRightHand = () => {
    const { rightHandPan } = this;
    return Animated.event([null, { dx: rightHandPan.x, dy: rightHandPan.y }]);
  };

  adjustMagnifierOffset = () => {
    const { type } = this.state;
    if (type === 'leftShulder') {
      this.reverseXValue = this.leftShulderPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: LEFT_SHULDER_OFFSET.x, isStart: true }),
          outputX({ xOffset: LEFT_SHULDER_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.leftShulderPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: LEFT_SHULDER_OFFSET.y, isStart: true }),
          outputY({ yOffset: LEFT_SHULDER_OFFSET.y }),
        ],
      });
    } else if (type === 'leftElbow') {
      this.reverseXValue = this.leftElbowPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: LEFT_ELBOW_OFFSET.x, isStart: true }),
          outputX({ xOffset: LEFT_ELBOW_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.leftElbowPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: LEFT_ELBOW_OFFSET.y, isStart: true }),
          outputY({ yOffset: LEFT_ELBOW_OFFSET.y }),
        ],
      });
    } else if (type === 'leftHand') {
      this.reverseXValue = this.leftHandPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: LEFT_HAND_OFFSET.x, isStart: true }),
          outputX({ xOffset: LEFT_HAND_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.leftHandPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: LEFT_HAND_OFFSET.y, isStart: true }),
          outputY({ yOffset: LEFT_HAND_OFFSET.y }),
        ],
      });
    } else if (type === 'leftNeck') {
      this.reverseXValue = this.leftNeckPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: LEFT_NECK_OFFSET.x, isStart: true }),
          outputX({ xOffset: LEFT_NECK_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.leftNeckPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: LEFT_NECK_OFFSET.y, isStart: true }),
          outputY({ yOffset: LEFT_NECK_OFFSET.y }),
        ],
      });
    } else if (type === 'rightNeck') {
      this.reverseXValue = this.rightNeckPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: RIGHT_NECK_OFFSET.x, isStart: true }),
          outputX({ xOffset: RIGHT_NECK_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.rightNeckPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: RIGHT_NECK_OFFSET.y, isStart: true }),
          outputY({ yOffset: RIGHT_NECK_OFFSET.y }),
        ],
      });
    } else if (type === 'rightShulder') {
      this.reverseXValue = this.rightShulderPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: RIGHT_SHULDER_OFFSET.x, isStart: true }),
          outputX({ xOffset: RIGHT_SHULDER_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.rightShulderPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: RIGHT_SHULDER_OFFSET.y, isStart: true }),
          outputY({ yOffset: RIGHT_SHULDER_OFFSET.y }),
        ],
      });
    } else if (type === 'rightElbow') {
      this.reverseXValue = this.rightElbowPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: RIGHT_ELBOW_OFFSET.x, isStart: true }),
          outputX({ xOffset: RIGHT_ELBOW_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.rightElbowPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: RIGHT_ELBOW_OFFSET.y, isStart: true }),
          outputY({ yOffset: RIGHT_ELBOW_OFFSET.y }),
        ],
      });
    } else if (type === 'rightHand') {
      this.reverseXValue = this.rightHandPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: RIGHT_HAND_OFFSET.x, isStart: true }),
          outputX({ xOffset: RIGHT_HAND_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.rightHandPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: RIGHT_HAND_OFFSET.y, isStart: true }),
          outputY({ yOffset: RIGHT_HAND_OFFSET.y }),
        ],
      });
    }
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'next') {
      const {
        componentId,
        name,
        nickname,
        phone,
        gender,
        password,
        base64,
        height,
        weight,
        headOffset,
        footOffset,
      } = this.props;
      const {
        leftNeckOffset,
        leftShulderOffset,
        leftElbowOffset,
        leftHandOffset,
        rightNeckOffset,
        rightShulderOffset,
        rightElbowOffset,
        rightHandOffset,
      } = this.state;

      Navigation.push(componentId, {
        component: {
          name: 'wave.upperBodySlide',
          passProps: {
            phone,
            gender,
            nickname,
            name,
            password,
            base64,
            height,
            weight,
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
          },
        },
      });
    }
  }

  render() {
    // 각 슬라이더에 따라 돋보기 오프셋 설정
    this.adjustMagnifierOffset();
    const {
      leftNeckPan,
      leftNeckScale,
      leftShulderPan,
      leftShulderScale,
      leftElbowPan,
      leftElbowScale,
      leftHandPan,
      leftHandScale,
      rightNeckPan,
      rightNeckScale,
      rightShulderPan,
      rightShulderScale,
      rightElbowPan,
      rightElbowScale,
      rightHandPan,
      rightHandScale,
      reverseXValue,
      reverseYValue,
      magnifierOpacity,
    } = this;

    const { base64 } = this.props;
    const { typeText } = this.state;
    const leftNeckSlide = {
      transform: [
        { translateX: leftNeckPan.x },
        { translateY: leftNeckPan.y },
        { scale: leftNeckScale },
      ],
      top: LEFT_NECK_OFFSET.y,
      left: LEFT_NECK_OFFSET.x,
    };

    const leftShulderSlide = {
      transform: [
        { translateX: leftShulderPan.x },
        { translateY: leftShulderPan.y },
        { scale: leftShulderScale },
      ],
      top: LEFT_SHULDER_OFFSET.y,
      left: LEFT_SHULDER_OFFSET.x,
    };

    const leftElbowSlide = {
      transform: [
        { translateX: leftElbowPan.x },
        { translateY: leftElbowPan.y },
        { scale: leftElbowScale },
      ],
      top: LEFT_ELBOW_OFFSET.y,
      left: LEFT_ELBOW_OFFSET.x,
    };

    const leftHandSlide = {
      transform: [
        { translateX: leftHandPan.x },
        { translateY: leftHandPan.y },
        { scale: leftHandScale },
      ],
      top: LEFT_HAND_OFFSET.y,
      left: LEFT_HAND_OFFSET.x,
    };

    const rightNeckSlide = {
      transform: [
        { translateX: rightNeckPan.x },
        { translateY: rightNeckPan.y },
        { scale: rightNeckScale },
      ],
      top: RIGHT_NECK_OFFSET.y,
      left: RIGHT_NECK_OFFSET.x,
    };

    const rightShulderSlide = {
      transform: [
        { translateX: rightShulderPan.x },
        { translateY: rightShulderPan.y },
        { scale: rightShulderScale },
      ],
      top: RIGHT_SHULDER_OFFSET.y,
      left: RIGHT_SHULDER_OFFSET.x,
    };

    const rightElbowSlide = {
      transform: [
        { translateX: rightElbowPan.x },
        { translateY: rightElbowPan.y },
        { scale: rightElbowScale },
      ],
      top: RIGHT_ELBOW_OFFSET.y,
      left: RIGHT_ELBOW_OFFSET.x,
    };

    const rightHandSlide = {
      transform: [
        { translateX: rightHandPan.x },
        { translateY: rightHandPan.y },
        { scale: rightHandScale },
      ],
      top: RIGHT_HAND_OFFSET.y,
      left: RIGHT_HAND_OFFSET.x,
    };

    const guideOpacity = {
      opacity: this.guideOpacity,
    };

    const magnifierImageStyle = {
      top: reverseYValue,
      left: reverseXValue,
      resizeMode: 'cover',
      borderWidth: 1,
    };

    return (
      <Container>
        <ImageContainer
          imageStyle={{
            resizeMode: 'cover',
          }}
          source={{
            uri: `data:image/gif;base64,${base64}`,
            // uri:
            //   'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80',
          }}
        >
          <MagnifierWrapper
            style={{
              opacity: magnifierOpacity,
            }}
          >
            <MagnifierContainer>
              <MagifierCross />
              <MagnifierImage
                source={{
                  uri: `data:image/gif;base64,${base64}`,
                  // uri:
                  //   'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80',
                }}
                style={magnifierImageStyle}
              />
            </MagnifierContainer>
            <MagnifierText>{typeText}</MagnifierText>
          </MagnifierWrapper>
          <Slider
            style={leftNeckSlide}
            {...this.leftNeckPanResponder.panHandlers}
          />
          <Slider
            style={leftShulderSlide}
            {...this.leftShulderPanResponder.panHandlers}
          />
          <Slider
            style={leftElbowSlide}
            {...this.leftElbowPanResponder.panHandlers}
          />
          <Slider
            style={leftHandSlide}
            {...this.leftHandPanResponder.panHandlers}
          />
          <Slider
            style={rightNeckSlide}
            {...this.rightNeckPanResponder.panHandlers}
          />
          <Slider
            style={rightShulderSlide}
            {...this.rightShulderPanResponder.panHandlers}
          />
          <Slider
            style={rightElbowSlide}
            {...this.rightElbowPanResponder.panHandlers}
          />
          <Slider
            style={rightHandSlide}
            {...this.rightHandPanResponder.panHandlers}
          />
        </ImageContainer>
        <HelpWrapper {...this.guideResponder.panHandlers}>
          <Icon name="question" type="font-awesome" color="#ffffff" size={25} />
        </HelpWrapper>
        <GuideImage
          source={require('./images/shulderArmGuide.png')}
          style={guideOpacity}
        />
      </Container>
    );
  }
}

ShulderArmSlideScreen.propTypes = {
  base64: PropTypes.string,
  componentId: PropTypes.string,
  password: PropTypes.string,
  phone: PropTypes.string,
  gender: PropTypes.string,
  height: PropTypes.string,
  weight: PropTypes.string,
  name: PropTypes.string,
  nickname: PropTypes.string,
  headOffset: PropTypes.object,
  footOffset: PropTypes.object,
};

export default ShulderArmSlideScreen;
