import styled from 'styled-components/native';
import { ImageBackground, Animated } from 'react-native';
import { theme } from '../../constants';
import {
  SLIDER_SIZE,
  HALF_SLIDER_SIZE,
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
} from './constants';

export const Container = styled.View`
  width: 100%;
  height: 100%;
`;

export const ImageContainer = styled(ImageBackground)`
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: ${IMAGE_WIDTH};
  height: ${IMAGE_HEIGHT};
`;

export const MagnifierWrapper = styled(Animated.View)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;

export const MagnifierContainer = styled(Animated.View)`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 3px solid ${theme.pointColor};
  background-color: black;
  overflow: hidden;
`;

export const MagnifierImage = styled(Animated.Image)`
  width: ${IMAGE_WIDTH};
  height: ${IMAGE_HEIGHT};
`;

export const MagnifierText = styled.Text`
  color: ${theme.pointColor};
  font-weight: bold;
`;

export const MagifierCross = styled.View`
  top: 50;
  left: 50;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  z-index: 100;
  background-color: ${theme.pointColor};
`;

export const Slider = styled(Animated.View)`
  width: ${SLIDER_SIZE};
  height: ${SLIDER_SIZE};
  position: absolute;
  background-color: #ffffff;
  border: 1px solid ${theme.pointColor};
  border-radius: ${HALF_SLIDER_SIZE};
`;
