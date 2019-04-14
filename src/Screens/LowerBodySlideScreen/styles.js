import styled from 'styled-components/native';
import { ImageBackground, Animated } from 'react-native';
import { theme } from '../../constants';
import {
  SLIDER_SIZE,
  HALF_SLIDER_SIZE,
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
  ZOOM,
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
  border: 3px solid ${theme.pointColor};
  background-color: black;
  overflow: hidden;
`;

export const MagnifierImage = styled(Animated.Image)`
  width: ${IMAGE_WIDTH * ZOOM};
  height: ${IMAGE_HEIGHT * ZOOM};
`;

export const MagnifierText = styled.Text`
  color: ${theme.pointColor};
  font-weight: bold;
`;

export const MagifierCross = styled.View`
  top: 47;
  left: 47;
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

export const HelpWrapper = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10;
  bottom: 10;
  height: 50px;
  width: 50px;
  background: ${theme.pointColor};
  border-radius: 25px;
`;

export const GuideImage = styled(Animated.Image)`
  position: absolute;
  width: ${IMAGE_WIDTH};
  height: ${IMAGE_HEIGHT};
`;
