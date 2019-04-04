import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, PanResponder, Animated, Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native-elements';
import { Container, ImageContainer } from './styles';
import { theme } from '../../constants';
const window = Dimensions.get('window');
const imageHeight = window.height - 150;
const xOffset = 100;
const yOffset = 200;
const maginifierContainerSize = 100 / 2;
const maginifierSize = 26;
const halfMaginifierSize = 26 / 2;
const outputXStart = -(xOffset - maginifierContainerSize) - halfMaginifierSize;
const outputYStart = -(yOffset - maginifierContainerSize) - halfMaginifierSize;
const outputXEnd = -(
  window.width
  + (xOffset - maginifierContainerSize)
  + maginifierSize
);
const outputYEnd = -(
  imageHeight
  + (yOffset - maginifierContainerSize)
  + maginifierSize
);

export class BodySliderScreen extends Component {
  static options(passProps) {
    return {
      topBar: {},
    };
  }

  constructor(props) {
    super(props);
    this.pan = new Animated.ValueXY();
    this.tobBarHeight = 0;
    this.reverseXValue = this.pan.x.interpolate({
      inputRange: [0, window.width],
      outputRange: [outputXStart, outputXEnd],
    });
    this.reverseYValue = this.pan.y.interpolate({
      inputRange: [0, imageHeight],
      outputRange: [outputYStart, outputYEnd],
    });
    this.state = {
      scale: new Animated.Value(1),
      magnifierOpacity: new Animated.Value(0),
    };
    const { scale, magnifierOpacity } = this.state;

    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        this.pan.setOffset({
          x: this.pan.x._value,
          y: this.pan.y._value,
        });
        this.pan.setValue({ x: 0, y: 0 });
        Animated.parallel([
          Animated.spring(scale, { toValue: 1.5, friction: 3 }),
          Animated.timing(
            // Animate over time
            magnifierOpacity, // The animated value to drive
            {
              toValue: 1, // Animate to opacity: 1 (opaque)
            },
          ),
        ]).start();
      },
      onPanResponderMove: this.onDragging(),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        this.pan.flattenOffset();
        Animated.spring(scale, { toValue: 1, friction: 3 }).start();
        Animated.timing(
          // Animate over time
          magnifierOpacity, // The animated value to drive
          {
            toValue: 0, // Animate to opacity: 1 (opaque)
          },
        ).start();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });
  }

  checkPosition = () => {};

  onDragging = () => {
    const { pan } = this;
    return Animated.event([null, { dx: pan.x, dy: pan.y }]);
  };

  render() {
    // Destructure the value of pan from the state
    const { pan, reverseXValue, reverseYValue } = this;
    const { scale, magnifierOpacity } = this.state;
    const { base64 } = this.props;

    // Calculate the x and y transform from the pan value
    const [translateX, translateY] = [pan.x, pan.y];

    const sliderStyle = {
      transform: [{ translateX }, { translateY }, { scale }],
      position: 'absolute',
      width: maginifierSize,
      height: maginifierSize,
      borderRadius: halfMaginifierSize,
      borderColor: theme.pointColor,
      borderWidth: 1,
      top: yOffset,
      left: xOffset,
      backgroundColor: '#ffffff',
    };

    const magnifierImageStyle = {
      top: reverseYValue,
      left: reverseXValue,
      width: window.width,
      height: imageHeight,
      resizeMode: 'cover',
      borderWidth: 1,
    };

    return (
      <Container>
        <ImageContainer
          style={{
            position: 'relative',
            width: window.width,
            height: imageHeight,
          }}
          imageStyle={{
            resizeMode: 'cover',
            borderWidth: 1,
            borderColor: 'blue',
          }}
          source={{
            uri: `data:image/gif;base64,${base64}`,
            // uri:
            //   'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80',
          }}
        >
          <Animated.View
            style={{
              position: 'relative',
              top: 0,
              left: 0,
              width: 100,
              height: 100,
              borderWidth: 3,
              borderRadius: 50,
              backgroundColor: 'black',
              overflow: 'hidden',
              borderColor: theme.pointColor,
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
                uri: `data:image/gif;base64,${base64}`,
                // uri:
                //   'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80',
              }}
              style={magnifierImageStyle}
            />
          </Animated.View>
          <Animated.View
            style={sliderStyle}
            {...this.panResponder.panHandlers}
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
