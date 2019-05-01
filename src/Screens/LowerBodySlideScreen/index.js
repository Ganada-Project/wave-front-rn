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
  LEFT_THIGH_OFFSET,
  LEFT_ANKLE_OFFSET,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  SLIDER_SCALE,
  RIGHT_THIGH_OFFSET,
  RIGHT_ANKLE_OFFSET,
} from './constants';
import { theme } from '../../constants';

export class LowerBodySlideScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '하체',
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
      leftThighOffset: {
        x: LEFT_THIGH_OFFSET.x,
        y: LEFT_THIGH_OFFSET.y,
      },
      leftAnkleOffset: {
        x: LEFT_ANKLE_OFFSET.x,
        y: LEFT_ANKLE_OFFSET.y,
      },
      rightThighOffset: {
        x: RIGHT_THIGH_OFFSET.x,
        y: RIGHT_THIGH_OFFSET.y,
      },
      rightAnkleOffset: {
        x: RIGHT_ANKLE_OFFSET.x,
        y: RIGHT_ANKLE_OFFSET.y,
      },
    };
    Navigation.events().bindComponent(this);
    // 왼쪽 허벅지
    this.leftThighPan = new Animated.ValueXY();
    this.leftThighScale = new Animated.Value(1);
    // 왼쪽 발목
    this.leftAnklePan = new Animated.ValueXY();
    this.leftAnkleScale = new Animated.Value(1);
    // 오른쪽 허벅지
    this.rightThighPan = new Animated.ValueXY();
    this.rightThighScale = new Animated.Value(1);
    // 오른쪽 발목
    this.rightAnklePan = new Animated.ValueXY();
    this.rightAnkleScale = new Animated.Value(1);

    // 돋보기 투명도
    this.magnifierOpacity = new Animated.Value(0);
    // 가이드 투명도
    this.guideOpacity = new Animated.Value(0);
    const {
      leftThighScale,
      leftAnkleScale,
      rightThighScale,
      rightAnkleScale,
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
    // 왼쪽 허벅지 슬라이더 이벤트
    this.leftThighPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.leftThighPan.setOffset({
          x: this.leftThighPan.x._value,
          y: this.leftThighPan.y._value,
        });
        this.leftThighPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(leftThighScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'leftThigh', typeText: '왼쪽 허벅지' });
      },
      onPanResponderMove: this.onDraggingLeftThigh(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.leftThighPan.flattenOffset();
        Animated.parallel([
          Animated.spring(leftThighScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          leftThighOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 왼쪽 발목 슬라이더 이벤트
    this.leftAnklePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.leftAnklePan.setOffset({
          x: this.leftAnklePan.x._value,
          y: this.leftAnklePan.y._value,
        });
        this.leftAnklePan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(leftAnkleScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'leftAnkle', typeText: '왼쪽 발목' });
      },
      onPanResponderMove: this.onDraggingLeftAnkle(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.leftAnklePan.flattenOffset();
        Animated.parallel([
          Animated.spring(leftAnkleScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          leftAnkleOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 오른쪽 허벅지 슬라이더 이벤트
    this.rightThighPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.rightThighPan.setOffset({
          x: this.rightThighPan.x._value,
          y: this.rightThighPan.y._value,
        });
        this.rightThighPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(rightThighScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'rightThigh', typeText: '오른쪽 허벅지' });
      },
      onPanResponderMove: this.onDraggingRightThigh(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.rightThighPan.flattenOffset();
        Animated.parallel([
          Animated.spring(rightThighScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          rightThighOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 오른쪽 발목 슬라이더 이벤트
    this.rightAnklePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.rightAnklePan.setOffset({
          x: this.rightAnklePan.x._value,
          y: this.rightAnklePan.y._value,
        });
        this.rightAnklePan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(rightAnkleScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'rightAnkle', typeText: '오른쪽 발목' });
      },
      onPanResponderMove: this.onDraggingRightAnkle(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.rightAnklePan.flattenOffset();
        Animated.parallel([
          Animated.spring(rightAnkleScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          rightAnkleOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
  }

  onDraggingLeftThigh = () => {
    const { leftThighPan } = this;
    return Animated.event([null, { dx: leftThighPan.x, dy: leftThighPan.y }]);
  };

  onDraggingLeftAnkle = () => {
    const { leftAnklePan } = this;
    return Animated.event([null, { dx: leftAnklePan.x, dy: leftAnklePan.y }]);
  };

  onDraggingRightThigh = () => {
    const { rightThighPan } = this;
    return Animated.event([null, { dx: rightThighPan.x, dy: rightThighPan.y }]);
  };

  onDraggingRightAnkle = () => {
    const { rightAnklePan } = this;
    return Animated.event([null, { dx: rightAnklePan.x, dy: rightAnklePan.y }]);
  };

  adjustMagnifierOffset = () => {
    const { type } = this.state;
    if (type === 'leftThigh') {
      this.reverseXValue = this.leftThighPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: LEFT_THIGH_OFFSET.x, isStart: true }),
          outputX({ xOffset: LEFT_THIGH_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.leftThighPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: LEFT_THIGH_OFFSET.y, isStart: true }),
          outputY({ yOffset: LEFT_THIGH_OFFSET.y }),
        ],
      });
    } else if (type === 'leftAnkle') {
      this.reverseXValue = this.leftAnklePan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: LEFT_ANKLE_OFFSET.x, isStart: true }),
          outputX({ xOffset: LEFT_ANKLE_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.leftAnklePan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: LEFT_ANKLE_OFFSET.y, isStart: true }),
          outputY({ yOffset: LEFT_ANKLE_OFFSET.y }),
        ],
      });
    } else if (type === 'rightThigh') {
      this.reverseXValue = this.rightThighPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: RIGHT_THIGH_OFFSET.x, isStart: true }),
          outputX({ xOffset: RIGHT_THIGH_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.rightThighPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: RIGHT_THIGH_OFFSET.y, isStart: true }),
          outputY({ yOffset: RIGHT_THIGH_OFFSET.y }),
        ],
      });
    } else if (type === 'rightAnkle') {
      this.reverseXValue = this.rightAnklePan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: RIGHT_ANKLE_OFFSET.x, isStart: true }),
          outputX({ xOffset: RIGHT_ANKLE_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.rightAnklePan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: RIGHT_ANKLE_OFFSET.y, isStart: true }),
          outputY({ yOffset: RIGHT_ANKLE_OFFSET.y }),
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
        age,
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
      } = this.props;
      const {
        leftThighOffset,
        leftAnkleOffset,
        rightThighOffset,
        rightAnkleOffset,
      } = this.state;

      Navigation.push(componentId, {
        component: {
          name: 'wave.finalRegister',
          passProps: {
            phone,
            gender,
            nickname,
            name,
            age,
            password,
            height,
            weight,
            base64,
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
          },
        },
      });
    }
  }

  render() {
    // 각 슬라이더에 따라 돋보기 오프셋 설정
    this.adjustMagnifierOffset();
    const {
      leftThighPan,
      leftThighScale,
      leftAnklePan,
      leftAnkleScale,
      rightThighPan,
      rightThighScale,
      rightAnklePan,
      rightAnkleScale,
      reverseXValue,
      reverseYValue,
      magnifierOpacity,
    } = this;

    const { base64 } = this.props;
    const { typeText } = this.state;

    const leftThighSlide = {
      transform: [
        { translateX: leftThighPan.x },
        { translateY: leftThighPan.y },
        { scale: leftThighScale },
      ],
      top: LEFT_THIGH_OFFSET.y,
      left: LEFT_THIGH_OFFSET.x,
    };

    const leftAnkleSlide = {
      transform: [
        { translateX: leftAnklePan.x },
        { translateY: leftAnklePan.y },
        { scale: leftAnkleScale },
      ],
      top: LEFT_ANKLE_OFFSET.y,
      left: LEFT_ANKLE_OFFSET.x,
    };

    const rightThighSlide = {
      transform: [
        { translateX: rightThighPan.x },
        { translateY: rightThighPan.y },
        { scale: rightThighScale },
      ],
      top: RIGHT_THIGH_OFFSET.y,
      left: RIGHT_THIGH_OFFSET.x,
    };

    const rightAnkleSlide = {
      transform: [
        { translateX: rightAnklePan.x },
        { translateY: rightAnklePan.y },
        { scale: rightAnkleScale },
      ],
      top: RIGHT_ANKLE_OFFSET.y,
      left: RIGHT_ANKLE_OFFSET.x,
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
            style={leftThighSlide}
            {...this.leftThighPanResponder.panHandlers}
          />
          <Slider
            style={leftAnkleSlide}
            {...this.leftAnklePanResponder.panHandlers}
          />
          <Slider
            style={rightThighSlide}
            {...this.rightThighPanResponder.panHandlers}
          />
          <Slider
            style={rightAnkleSlide}
            {...this.rightAnklePanResponder.panHandlers}
          />
        </ImageContainer>
        <HelpWrapper {...this.guideResponder.panHandlers}>
          <Icon name="question" type="font-awesome" color="#ffffff" size={25} />
        </HelpWrapper>
        <GuideImage
          source={require('./images/lowerBodyGuide.png')}
          style={guideOpacity}
        />
      </Container>
    );
  }
}

LowerBodySlideScreen.propTypes = {
  base64: PropTypes.string,
  componentId: PropTypes.string,
  password: PropTypes.string,
  phone: PropTypes.string,
  gender: PropTypes.number,
  name: PropTypes.string,
  age: PropTypes.string,
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
  leftChestOffset: PropTypes.object,
  leftWaistOffset: PropTypes.object,
  leftPelvisOffset: PropTypes.object,
  rightChestOffset: PropTypes.object,
  rightWaistOffset: PropTypes.object,
  rightPelvisOffset: PropTypes.object,
};

export default LowerBodySlideScreen;
