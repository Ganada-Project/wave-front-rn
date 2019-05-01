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
  HEAD_OFFSET,
  FOOT_OFFSET,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  SLIDER_SCALE,
} from './constants';
import { theme } from '../../constants';

export class HeightSlideScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '신장',
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
      headOffset: {
        x: HEAD_OFFSET.x,
        y: HEAD_OFFSET.y,
      },
      footOffset: {
        x: FOOT_OFFSET.x,
        y: FOOT_OFFSET.y,
      },
    };
    Navigation.events().bindComponent(this);
    // 머리
    this.headPan = new Animated.ValueXY();
    this.headSacle = new Animated.Value(1);
    // 발
    this.footPan = new Animated.ValueXY();
    this.footScale = new Animated.Value(1);
    // 돋보기 투명도
    this.magnifierOpacity = new Animated.Value(0);
    // 가이드 투명도
    this.guideOpacity = new Animated.Value(0);
    const {
      headSacle, footScale, magnifierOpacity, guideOpacity,
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
    // 머리 슬라이더 이벤트
    this.headPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.headPan.setOffset({
          x: this.headPan.x._value,
          y: this.headPan.y._value,
        });
        this.headPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(headSacle, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'head', typeText: '정수리' });
      },
      onPanResponderMove: this.onDraggingHead(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.headPan.flattenOffset();
        Animated.parallel([
          Animated.spring(headSacle, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          headOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
    // 발 슬라이더 이벤트
    this.footPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.footPan.setOffset({
          x: this.footPan.x._value,
          y: this.footPan.y._value,
        });
        this.footPan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(footScale, {
            toValue: SLIDER_SCALE,
            friction: 3,
          }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
        this.setState({ type: 'foot', typeText: '발 뒤꿈치' });
      },
      onPanResponderMove: this.onDraggingFoot(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event) => {
        this.footPan.flattenOffset();
        Animated.parallel([
          Animated.spring(footScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
        this.setState({
          footOffset: {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          },
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
  }

  onDraggingHead = () => {
    const { headPan } = this;
    return Animated.event([null, { dx: headPan.x, dy: headPan.y }]);
  };

  onDraggingFoot = () => {
    const { footPan } = this;
    return Animated.event([null, { dx: footPan.x, dy: footPan.y }]);
  };

  adjustMagnifierOffset = () => {
    const { type } = this.state;
    if (type === 'head') {
      this.reverseXValue = this.headPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: HEAD_OFFSET.x, isStart: true }),
          outputX({ xOffset: HEAD_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.headPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: HEAD_OFFSET.y, isStart: true }),
          outputY({ yOffset: HEAD_OFFSET.y }),
        ],
      });
    } else if (type === 'foot') {
      this.reverseXValue = this.footPan.x.interpolate({
        inputRange: [0, IMAGE_WIDTH],
        outputRange: [
          outputX({ xOffset: FOOT_OFFSET.x, isStart: true }),
          outputX({ xOffset: FOOT_OFFSET.x }),
        ],
      });
      this.reverseYValue = this.footPan.y.interpolate({
        inputRange: [0, IMAGE_HEIGHT],
        outputRange: [
          outputY({ yOffset: FOOT_OFFSET.y, isStart: true }),
          outputY({ yOffset: FOOT_OFFSET.y }),
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
        age,
        height,
        weight,
      } = this.props;
      const { headOffset, footOffset } = this.state;
      Navigation.push(componentId, {
        component: {
          name: 'wave.shulderArmSlide',
          passProps: {
            phone,
            gender,
            nickname,
            name,
            password,
            height,
            weight,
            base64,
            age,
            headOffset,
            footOffset,
          },
        },
      });
    }
  }

  render() {
    // 각 슬라이더에 따라 돋보기 오프셋 설정
    this.adjustMagnifierOffset();
    const {
      headPan,
      headSacle,
      footPan,
      footScale,
      reverseXValue,
      reverseYValue,
      magnifierOpacity,
    } = this;

    const { base64 } = this.props;
    const { typeText } = this.state;

    const headSlide = {
      transform: [
        { translateX: headPan.x },
        { translateY: headPan.y },
        { scale: headSacle },
      ],
      top: HEAD_OFFSET.y,
      left: HEAD_OFFSET.x,
    };

    const footSlide = {
      transform: [
        { translateX: footPan.x },
        { translateY: footPan.y },
        { scale: footScale },
      ],
      top: FOOT_OFFSET.y,
      left: FOOT_OFFSET.x,
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
          <Slider style={headSlide} {...this.headPanResponder.panHandlers} />
          <Slider style={footSlide} {...this.footPanResponder.panHandlers} />
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

HeightSlideScreen.propTypes = {
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
};

export default HeightSlideScreen;
