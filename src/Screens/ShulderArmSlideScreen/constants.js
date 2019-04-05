import { Dimensions } from 'react-native';
export const MAGINIFIER_CONTAINER_SIZE = 100 / 2;
export const SLIDER_SIZE = 26;
export const HALF_SLIDER_SIZE = SLIDER_SIZE / 2;
export const SLIDER_SCALE = 2;
const window = Dimensions.get('window');
export const IMAGE_WIDTH = window.width;
export const IMAGE_HEIGHT = window.height - 44;

export const LEFT_NECK_OFFSET = {
  x: 130,
  y: 140,
};

export const LEFT_SHULDER_OFFSET = {
  x: 100,
  y: 200,
};

export const LEFT_ELBOW_OFFSET = {
  x: 100,
  y: 280,
};

export const LEFT_HAND_OFFSET = {
  x: 100,
  y: 360,
};
