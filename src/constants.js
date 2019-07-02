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
  whiteColor: '#ffffff',
  grayColor: '#d8d8d8',
  textColor: '#5b5e6d',
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

export const gradientSpeed = 5000;
export const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
export const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : null;
