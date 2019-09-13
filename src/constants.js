/**
 * Global Constants
 */
import { Platform } from 'react-native';
export const API_URL = 'http://13.124.21.111/api';
export const fonts = {
  NanumGothic: 'NanumGothic',
};
export const theme = {
  pointColor: '#dd6770',
  subColor: 'rgb(106,130,251)',
  whiteColor: '#ffffff',
  grayColor: '#dee0e3',
  darkGray: '#88929c',
  textColor: '#5b5e6d',
  guideColor: '#14ff1e',
};

export const TopBarHeight = 120;
export const AuthTopBarOption = Platform.OS === 'ios'
  ? {
    noBorder: true,
    background: {
      translucent: true,
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
  },
  drawBehind: true,
  backButton: {
    color: 'white',
  },
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
