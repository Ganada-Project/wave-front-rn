import React, { Component } from 'react';
import {
  Text, View, PanResponder, Animated,
} from 'react-native';
import { Slider, Container } from './styles';

export class BodySliderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
    };
    const { pan } = this.state;
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
        pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        pan.flattenOffset();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) =>
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        true,
    });
  }

  render() {
    // Destructure the value of pan from the state
    const { pan } = this.state;

    // Calculate the x and y transform from the pan value
    const [translateX, translateY] = [pan.x, pan.y];

    const sliderStyle = {
      transform: [{ translateX }, { translateY }],
      width: 50,
      height: 50,
      backgroundColor: 'red',
    };

    return (
      <Container>
        <Animated.View style={sliderStyle} {...this.panResponder.panHandlers} />
      </Container>
    );
  }
}

export default BodySliderScreen;
