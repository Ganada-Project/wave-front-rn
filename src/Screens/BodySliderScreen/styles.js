import styled from 'styled-components/native';
import { ImageBackground, Dimensions, Animated } from 'react-native';
import { theme } from '../../constants';
import { sliderSize, halfsliderSize } from './constants';
const window = Dimensions.get('window');

export const Container = styled.View`
  width: 100%;
  height: 100%;
`;

export const ImageContainer = styled(ImageBackground)`
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: ${window.width};
  height: ${(props) => props.imageHeight};
`;

export const MagnifierContainer = styled(Animated.View)`
  position: relative;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 3px solid ${theme.pointColor};
  background-color: black;
  overflow: hidden;
`;

export const Slider = styled(Animated.View)`
  width: ${sliderSize};
  height: ${sliderSize};
  position: absolute;
  background-color: #ffffff;
  border: 1px solid ${theme.pointColor};
  border-radius: ${halfsliderSize};
`;
