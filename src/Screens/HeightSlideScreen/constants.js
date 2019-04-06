import { Dimensions } from 'react-native';
export const MAGINIFIER_CONTAINER_SIZE = 100 / 2;
export const SLIDER_SIZE = 100;
export const SLIDER_HEIGHT = 14;
export const HALF_SLIDER_SIZE = SLIDER_SIZE / 2;
export const SLIDER_SCALE = 1.3;
export const ZOOM = 2;
const window = Dimensions.get('window');
export const IMAGE_WIDTH = window.width;
export const IMAGE_HEIGHT = window.height - 44;

export const HEAD_OFFSET = {
  x: IMAGE_WIDTH / 2 - SLIDER_SIZE / 2,
  y: 150,
};

export const FOOT_OFFSET = {
  x: IMAGE_WIDTH / 2 - SLIDER_SIZE / 2,
  y: 600,
};
