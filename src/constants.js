/**
 * Global Constants
 */
import { Platform } from 'react-native';
export const API_URL = 'http://13.124.21.111/api';
export const fonts = {
  NanumGothic: 'NanumGothic',
};
export const theme = {
  pointColor: 'rgb(106,130,251)',
  subColor: 'rgb(220, 103, 112)',
  whiteColor: '#ffffff',
  grayColor: '#dee0e3',
  darkGray: '#88929c',
  textColor: '#111314',
  guideColor: '#14ff1e',
  backgroundColor: '#f9f7f9',
};

export const TopBarHeight = 120;
export const AuthTopBarOption =
  Platform.OS === 'ios'
    ? {
        noBorder: true,
        background: {
          color: theme.backgroundColor,
        },
        drawBehind: true,
        backButton: {
          color: theme.pointColor,
        },
      }
    : {
        noBorder: true,
        drawBehind: true,
        backButton: {
          color: theme.pointColor,
        },
      };

export const InvertOption = {
  noBorder: true,
  background: {
    translucent: true,
    color: 'transparent',
  },
  drawBehind: true,
  backButton: {
    color: 'white',
  },
  blur: false,
};

export const BaseHeightOffset = {
  head: 120,
  foot: 550,
};

export const gradientPreset = [
  // 'rgb(233, 134, 152)',
  'rgb(220, 103, 112)',
  // 'rgb(189, 60, 75)',
  // 'rgb(177,113,166)',
  'rgb(106,130,251)',
];

export const lightGradientPreset = [
  'rgb(233, 134, 152)',
  'rgb(222, 224, 227)',
  // 'rgb(189, 60, 75)',
  // 'rgb(177,113,166)',
];

export const gradientSpeed = 5000;
export const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
export const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : null;
