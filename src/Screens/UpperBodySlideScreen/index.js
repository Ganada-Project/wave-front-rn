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
import { outputX, outputY } from './utils/calculate';
import {
  LEFT_CHEST_OFFSET,
  LEFT_PELVIS_OFFSET,
  LEFT_WAIST_OFFSET,
  RIGHT_CHEST_OFFSET,
  RIGHT_PELVIS_OFFSET,
  RIGHT_WAIST_OFFSET,
  SLIDER_SCALE,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
} from './constants';
import { theme } from '../../constants';

export class UpperBodySlideScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '상체',
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
      leftChestOffset: {
        x: LEFT_CHEST_OFFSET.x,
        y: LEFT_CHEST_OFFSET.y,
      },
      leftWaistOffset: {
        x: LEFT_WAIST_OFFSET.x,
        y: LEFT_WAIST_OFFSET.y,
      },
      leftPelvisOffset: {
        x: LEFT_PELVIS_OFFSET.x,
        y: LEFT_PELVIS_OFFSET.y,
      },
      rightChestOffset: {
        x: RIGHT_CHEST_OFFSET.x,
        y: RIGHT_CHEST_OFFSET.y,
      },
      rightWaistOffset: {
        x: RIGHT_WAIST_OFFSET.x,
        y: RIGHT_WAIST_OFFSET.y,
      },
      rightPelvisOffset: {
        x: RIGHT_PELVIS_OFFSET.x,
        y: RIGHT_PELVIS_OFFSET.y,
      },
    };
    Navigation.events().bindComponent(this);
    // 왼쪽 가슴
    this.leftChestPan = new Animated.ValueXY();
    this.leftChestScale = new Animated.Value(1);
    // 왼쪽 허리
    this.leftWaistPan = new Animated.ValueXY();
    this.leftWaistScale = new Animated.Value(1);
    // 왼쪽 골반
    this.leftPelvisPan = new Animated.ValueXY();
    this.leftPelvisScale = new Animated.Value(1);
    // 오른쪽 가슴
    this.rightChestPan = new Animated.ValueXY();
    this.rightChestScale = new Animated.Value(1);
    // 오른쪽 허리
    this.rightWaistPan = new Animated.ValueXY();
    this.rightWaistScale = new Animated.Value(1);
    // 오른쪽 골반
    this.rightPelvisPan = new Animated.ValueXY();
    this.rightPelvisScale = new Animated.Value(1);
    // 돋보기 투명도
    this.magnifierOpacity = new Animated.Value(0);
    // 가이드 투명도
    this.guideOpacity = new Animated.Value(0);
    const {
      leftChestScale,
      leftWaistScale,
      leftPelvisScale,
      rightChestScale,
      rightWaistScale,
      rightPelvisScale,
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
    // 왼쪽 가슴 슬라이더 이벤트
    this.leftChestPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.leftChestPan.setOffset({
          x: this.leftChestPan.x._value,
          y: this.leftChestPan.y._value,
        });
        this.leftChestPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(leftChestScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'leftChest', typeText: '왼쪽 가슴' });
      },
      onPanResponderMove: this.onDraggingLeftChest(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.leftChestPan.flattenOffset();
        Animated.parallel([
          Animated.spring(leftChestScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          leftChestOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 왼쪽 허리 슬라이더 이벤트
    this.leftWaistPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.leftWaistPan.setOffset({
          x: this.leftWaistPan.x._value,
          y: this.leftWaistPan.y._value,
        });
        this.leftWaistPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(leftWaistScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'leftWaist', typeText: '왼쪽 허리' });
      },
      onPanResponderMove: this.onDraggingLeftWaist(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.leftWaistPan.flattenOffset();
        Animated.parallel([
          Animated.spring(leftWaistScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          leftWaistOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 왼쪽 골반 슬라이더 이벤트
    this.leftPelvisPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.leftPelvisPan.setOffset({
          x: this.leftPelvisPan.x._value,
          y: this.leftPelvisPan.y._value,
        });
        this.leftPelvisPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(leftPelvisScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'leftPelvis', typeText: '왼쪽 골반' });
      },
      onPanResponderMove: this.onDraggingLeftHand(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.leftPelvisPan.flattenOffset();
        Animated.parallel([
          Animated.spring(leftPelvisScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          leftPelvisOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });

    // 오른쪽 가슴 슬라이더 이벤트
    this.rightChestPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.rightChestPan.setOffset({
          x: this.rightChestPan.x._value,
          y: this.rightChestPan.y._value,
        });
        this.rightChestPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(rightChestScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'rightChest', typeText: '오른쪽 가슴' });
      },
      onPanResponderMove: this.onDraggingRightChest(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.rightChestPan.flattenOffset();
        Animated.parallel([
          Animated.spring(rightChestScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          rightChestOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 오른쪽 허리 슬라이더 이벤트
    this.rightWaistPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.rightWaistPan.setOffset({
          x: this.rightWaistPan.x._value,
          y: this.rightWaistPan.y._value,
        });
        this.rightWaistPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(rightWaistScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'rightWaist', typeText: '오른쪽 허리' });
      },
      onPanResponderMove: this.onDraggingRightWaist(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.rightWaistPan.flattenOffset();
        Animated.parallel([
          Animated.spring(rightWaistScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          rightWaistOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 오른쪽 골반 슬라이더 이벤트
    this.rightPelvisPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.rightPelvisPan.setOffset({
          x: this.rightPelvisPan.x._value,
          y: this.rightPelvisPan.y._value,
        });
        this.rightPelvisPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(rightPelvisScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'righPelvis', typeText: '오른쪽 골반' });
      },
      onPanResponderMove: this.onDraggingRightPelvis(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.rightPelvisPan.flattenOffset();
        Animated.parallel([
          Animated.spring(rightPelvisScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          rightPelvisOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
  }

  onDraggingLeftChest = () => {
    const { leftChestPan } = this;
    return Animated.event([null, { dx: leftChestPan.x, dy: leftChestPan.y }]);
  };

  onDraggingLeftWaist = () => {
    const { leftWaistPan } = this;
    return Animated.event([null, { dx: leftWaistPan.x, dy: leftWaistPan.y }]);
  };

  onDraggingLeftHand = () => {
    const { leftPelvisPan } = this;
    return Animated.event([null, { dx: leftPelvisPan.x, dy: leftPelvisPan.y }]);
  };

  onDraggingLeftNeck = () => {
    const { leftNeckPan } = this;
    return Animated.event([null, { dx: leftNeckPan.x, dy: leftNeckPan.y }]);
  };

  onDraggingRightNeck = () => {
    const { rightNeckPan } = this;
    return Animated.event([null, { dx: rightNeckPan.x, dy: rightNeckPan.y }]);
  };

  onDraggingRightChest = () => {
    const { rightChestPan } = this;
    return Animated.event([null, { dx: rightChestPan.x, dy: rightChestPan.y }]);
  };

  onDraggingRightWaist = () => {
    const { rightWaistPan } = this;
    return Animated.event([null, { dx: rightWaistPan.x, dy: rightWaistPan.y }]);
  };

  onDraggingRightPelvis = () => {
    const { rightPelvisPan } = this;
    return Animated.event([
      null,
      { dx: rightPelvisPan.x, dy: rightPelvisPan.y },
    ]);
  };

  adjustMagnifierOffset = () => {
    const { type } = this.state;
    if (type === 'leftChest') {
      this.reverseXValue = this.leftChestPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: LEFT_CHEST_OFFSET.x, isStart: true }),
          outputX({ xOffset: LEFT_CHEST_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.leftChestPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: LEFT_CHEST_OFFSET.y, isStart: true }),
          outputY({ yOffset: LEFT_CHEST_OFFSET.y }),
        ],
      });
    } else if (type === 'leftWaist') {
      this.reverseXValue = this.leftWaistPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: LEFT_WAIST_OFFSET.x, isStart: true }),
          outputX({ xOffset: LEFT_WAIST_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.leftWaistPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: LEFT_WAIST_OFFSET.y, isStart: true }),
          outputY({ yOffset: LEFT_WAIST_OFFSET.y }),
        ],
      });
    } else if (type === 'leftPelvis') {
      this.reverseXValue = this.leftPelvisPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: LEFT_PELVIS_OFFSET.x, isStart: true }),
          outputX({ xOffset: LEFT_PELVIS_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.leftPelvisPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: LEFT_PELVIS_OFFSET.y, isStart: true }),
          outputY({ yOffset: LEFT_PELVIS_OFFSET.y }),
        ],
      });
    } else if (type === 'rightChest') {
      this.reverseXValue = this.rightChestPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: RIGHT_CHEST_OFFSET.x, isStart: true }),
          outputX({ xOffset: RIGHT_CHEST_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.rightChestPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: RIGHT_CHEST_OFFSET.y, isStart: true }),
          outputY({ yOffset: RIGHT_CHEST_OFFSET.y }),
        ],
      });
    } else if (type === 'rightWaist') {
      this.reverseXValue = this.rightWaistPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: RIGHT_WAIST_OFFSET.x, isStart: true }),
          outputX({ xOffset: RIGHT_WAIST_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.rightWaistPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: RIGHT_WAIST_OFFSET.y, isStart: true }),
          outputY({ yOffset: RIGHT_WAIST_OFFSET.y }),
        ],
      });
    } else if (type === 'rightPelvis') {
      this.reverseXValue = this.rightPelvisPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: RIGHT_PELVIS_OFFSET.x, isStart: true }),
          outputX({ xOffset: RIGHT_PELVIS_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.rightPelvisPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: RIGHT_PELVIS_OFFSET.y, isStart: true }),
          outputY({ yOffset: RIGHT_PELVIS_OFFSET.y }),
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
        leftNeckOffset,
        leftShulderOffset,
        leftElbowOffset,
        leftHandOffset,
        rightNeckOffset,
        rightShulderOffset,
        rightElbowOffset,
        rightHandOffset,
      } = this.props;
      const {
        leftChestOffset,
        leftWaistOffset,
        leftPelvisOffset,
        rightChestOffset,
        rightWaistOffset,
        rightPelvisOffset,
      } = this.state;

      Navigation.push(componentId, {
        component: {
          name: 'wave.lowerBodySlide',
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
            leftChestOffset,
            leftWaistOffset,
            leftPelvisOffset,
            rightChestOffset,
            rightWaistOffset,
            rightPelvisOffset,
          },
        },
      });
    }
  }

  render() {
    // 각 슬라이더에 따라 돋보기 오프셋 설정
    this.adjustMagnifierOffset();
    const {
      leftChestPan,
      leftChestScale,
      leftWaistPan,
      leftWaistScale,
      leftPelvisPan,
      leftPelvisScale,
      rightChestPan,
      rightChestScale,
      rightWaistPan,
      rightWaistScale,
      rightPelvisPan,
      rightPelvisScale,
      reverseXValue,
      reverseYValue,
      magnifierOpacity,
    } = this;

    const { base64 } = this.props;
    const { typeText } = this.state;
    const leftChestSlide = {
      transform: [
        { translateX: leftChestPan.x },
        { translateY: leftChestPan.y },
        { scale: leftChestScale },
      ],
      top: LEFT_CHEST_OFFSET.y,
      left: LEFT_CHEST_OFFSET.x,
    };

    const leftWaistSlide = {
      transform: [
        { translateX: leftWaistPan.x },
        { translateY: leftWaistPan.y },
        { scale: leftWaistScale },
      ],
      top: LEFT_WAIST_OFFSET.y,
      left: LEFT_WAIST_OFFSET.x,
    };

    const leftPelvisSlide = {
      transform: [
        { translateX: leftPelvisPan.x },
        { translateY: leftPelvisPan.y },
        { scale: leftPelvisScale },
      ],
      top: LEFT_PELVIS_OFFSET.y,
      left: LEFT_PELVIS_OFFSET.x,
    };

    const rightChestSlide = {
      transform: [
        { translateX: rightChestPan.x },
        { translateY: rightChestPan.y },
        { scale: rightChestScale },
      ],
      top: RIGHT_CHEST_OFFSET.y,
      left: RIGHT_CHEST_OFFSET.x,
    };

    const rightWaistSlide = {
      transform: [
        { translateX: rightWaistPan.x },
        { translateY: rightWaistPan.y },
        { scale: rightWaistScale },
      ],
      top: RIGHT_WAIST_OFFSET.y,
      left: RIGHT_WAIST_OFFSET.x,
    };

    const rightPelvisSlide = {
      transform: [
        { translateX: rightPelvisPan.x },
        { translateY: rightPelvisPan.y },
        { scale: rightPelvisScale },
      ],
      top: RIGHT_PELVIS_OFFSET.y,
      left: RIGHT_PELVIS_OFFSET.x,
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
            style={leftChestSlide}
            {...this.leftChestPanResponder.panHandlers}
          />
          <Slider
            style={leftWaistSlide}
            {...this.leftWaistPanResponder.panHandlers}
          />
          <Slider
            style={leftPelvisSlide}
            {...this.leftPelvisPanResponder.panHandlers}
          />
          <Slider
            style={rightChestSlide}
            {...this.rightChestPanResponder.panHandlers}
          />
          <Slider
            style={rightWaistSlide}
            {...this.rightWaistPanResponder.panHandlers}
          />
          <Slider
            style={rightPelvisSlide}
            {...this.rightPelvisPanResponder.panHandlers}
          />
        </ImageContainer>
        <HelpWrapper {...this.guideResponder.panHandlers}>
          <Icon name="question" type="font-awesome" color="#ffffff" size={25} />
        </HelpWrapper>
        <GuideImage
          source={require('./images/upperBodyGuide.png')}
          style={guideOpacity}
        />
      </Container>
    );
  }
}

UpperBodySlideScreen.propTypes = {
  base64: PropTypes.string,
  componentId: PropTypes.string,
  password: PropTypes.string,
  phone: PropTypes.string,
  gender: PropTypes.string,
  name: PropTypes.string,
  nickname: PropTypes.string,
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
};

export default UpperBodySlideScreen;
