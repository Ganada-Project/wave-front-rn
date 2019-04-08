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
export const keyboardVerticalOffset = Platform.OS === 'ios' ? 70 : 0;
export const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : null;
