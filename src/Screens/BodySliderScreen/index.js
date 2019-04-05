import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, PanResponder, Animated, Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native-elements';
import {
  Container,
  ImageContainer,
  MagnifierContainer,
  Slider,
} from './styles';
import {
  leftShulderOffset,
  leftElbowOffset,
  maginifierContainerSize,
  sliderSize,
  halfsliderSize,
} from './constants';
const window = Dimensions.get('window');
const imageWidth = window.width;
const imageHeight = window.height - 150;

const outputX = ({ xOffset, isStart, zoom }) => {
  if (isStart) {
    return -(xOffset - maginifierContainerSize) - halfsliderSize;
  }
  return -(imageWidth + (xOffset - maginifierContainerSize) + sliderSize);
};

const outputY = ({ yOffset, isStart, zoom }) => {
  if (isStart) {
    return -(yOffset - maginifierContainerSize) - halfsliderSize;
  }
  return -(imageHeight + (yOffset - maginifierContainerSize) + sliderSize);
};

export class BodySliderScreen extends Component {
  static options(passProps) {
    return {
      topBar: {},
    };
  }

  constructor(props) {
    super(props);
    this.leftShulderPan = new Animated.ValueXY();
    this.leftShulderScale = new Animated.Value(1);
    this.leftElbowScale = new Animated.Value(1);
    this.leftElbowPan = new Animated.ValueXY();
    this.reverseXValue = this.leftShulderPan.x.interpolate({
      inputRange: [0, imageWidth],
      outputRange: [
        outputX({ xOffset: leftShulderOffset.x, isStart: true }),
        outputX({ xOffset: leftShulderOffset.x }),
      ],
    });
    this.reverseYValue = this.leftShulderPan.y.interpolate({
      inputRange: [0, imageHeight],
      outputRange: [
        outputY({ yOffset: leftShulderOffset.y, isStart: true }),
        outputY({ yOffset: leftShulderOffset.y }),
      ],
    });
    this.state = {
      magnifierOpacity: new Animated.Value(0),
    };
    const { leftShulderScale, leftElbowScale } = this;
    const { magnifierOpacity } = this.state;

    this.leftShulderPanResponder = PanResponder.create({
      // Ask to be the responder:
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
          Animated.spring(leftShulderScale, { toValue: 1.5, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
      },
      onPanResponderMove: this.onDragging(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: () => {
        this.leftShulderPan.flattenOffset();
        Animated.parallel([
          Animated.spring(leftShulderScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });

    this.leftElbowPanResponder = PanResponder.create({
      // Ask to be the responder:

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
          Animated.spring(leftElbowScale, { toValue: 1.5, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 1,
          }),
        ]).start();
      },
      onPanResponderMove: this.onDraggingLeftElbow(),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: () => {
        this.leftElbowPan.flattenOffset();
        Animated.parallel([
          Animated.spring(leftElbowScale, { toValue: 1, friction: 3 }),
          Animated.timing(magnifierOpacity, {
            toValue: 0,
          }),
        ]).start();
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
  }

  checkPosition = () => {};

  onDragging = () => {
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

  render() {
    // Destructure the value of pan from the state
    const {
      leftShulderPan,
      leftShulderScale,
      leftElbowPan,
      leftElbowScale,
      reverseXValue,
      reverseYValue,
    } = this;
    const { magnifierOpacity } = this.state;
    const { base64 } = this.props;

    const leftShulderSlide = {
      transform: [
        { translateX: leftShulderPan.x },
        { translateY: leftShulderPan.y },
        { scale: leftShulderScale },
      ],
      top: leftShulderOffset.y,
      left: leftShulderOffset.x,
    };

    const leftElbowSlide = {
      transform: [
        { translateX: leftElbowPan.x },
        { translateY: leftElbowPan.y },
        { scale: leftElbowScale },
      ],
      top: leftElbowOffset.y,
      left: leftElbowOffset.x,
    };

    const magnifierImageStyle = {
      top: reverseYValue,
      left: reverseXValue,
      width: imageWidth,
      height: imageHeight,
      resizeMode: 'cover',
      borderWidth: 1,
    };

    return (
      <Container>
        <ImageContainer
          imageHeight={imageHeight}
          imageStyle={{
            resizeMode: 'cover',
            borderWidth: 1,
            borderColor: 'blue',
          }}
          source={{
            // uri: `data:image/gif;base64,${base64}`,
            uri:
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80',
          }}
        >
          <MagnifierContainer
            style={{
              opacity: magnifierOpacity,
            }}
          >
            <View
              style={{
                top: 50,
                left: 50,
                width: 5,
                height: 5,
                zIndex: 100,
                borderColor: 'brown',
                borderWidth: 1,
              }}
            />
            <Animated.Image
              source={{
                // uri: `data:image/gif;base64,${base64}`,
                uri:
                  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80',
              }}
              style={magnifierImageStyle}
            />
          </MagnifierContainer>
          <Slider
            style={leftShulderSlide}
            {...this.leftShulderPanResponder.panHandlers}
          />
          <Slider
            style={leftElbowSlide}
            {...this.leftElbowPanResponder.panHandlers}
          />
        </ImageContainer>
      </Container>
    );
  }
}

BodySliderScreen.propTypes = {
  base64: PropTypes.string,
};

export default BodySliderScreen;
