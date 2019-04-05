/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanResponder, Animated } from 'react-native';
import { Navigation } from 'react-native-navigation';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native-elements';
import {
  Container,
  ImageContainer,
  MagnifierContainer,
  Slider,
  MagnifierImage,
  MagifierCross,
  MagnifierWrapper,
  MagnifierText,
} from './styles';
import { outputX, outputY, distanceBetween2Offset } from './utils/calculate';
import {
  LEFT_SHULDER_OFFSET,
  LEFT_ELBOW_OFFSET,
  LEFT_HAND_OFFSET,
  LEFT_NECK_OFFSET,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  SLIDER_SCALE,
} from './constants';
import { theme } from '../../constants';

export class ShulderArmSlideScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '어깨/팔 치수 측정',
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
    // 돋보기 투명도
    this.magnifierOpacity = new Animated.Value(0);
    const {
      leftShulderScale,
      leftElbowScale,
      leftHandScale,
      leftNeckScale,
      magnifierOpacity,
    } = this;
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
      } = this.props;
      const { leftShulderOffset, leftElbowOffset, leftHandOffset } = this.state;
      const shulderElbowDistance = distanceBetween2Offset({
        offset1: leftShulderOffset,
        offset2: leftElbowOffset,
      });
      const elbowHandDistance = distanceBetween2Offset({
        offset1: leftElbowOffset,
        offset2: leftHandOffset,
      });
      console.log(shulderElbowDistance);

      // Navigation.push(componentId, {
      //   component: {
      //     name: 'wave.bodySize',
      //     passProps: {
      //       phone,
      //       gender,
      //       nickname,
      //       name,
      //       password,
      //     },
      //   },
      // });
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
      reverseXValue,
      reverseYValue,
      magnifierOpacity,
    } = this;

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
            // uri: `data:image/gif;base64,${base64}`,
            uri:
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80',
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
                  // uri: `data:image/gif;base64,${base64}`,
                  uri:
                    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80',
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
        </ImageContainer>
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
  name: PropTypes.string,
  nickname: PropTypes.string,
};

export default ShulderArmSlideScreen;
