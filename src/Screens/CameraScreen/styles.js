import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { theme, BaseHeightOffset } from '../../constants';
const window = Dimensions.get('window');
export const IMAGE_WIDTH = window.width;
export const IMAGE_HEIGHT = window.height - 44;
export const HeadLine = styled.View`
  width: 100px;
  height: 14px;
  position: absolute;
  background-color: #ffffff;
  border: 1px solid ${theme.pointColor};
  border-radius: 5px;
  top: ${BaseHeightOffset.head};
  left: ${IMAGE_WIDTH / 2 - 50};
`;

export const FootLine = styled.View`
  width: 100px;
  height: 14px;
  position: absolute;
  background-color: #ffffff;
  border: 1px solid ${theme.pointColor};
  border-radius: 5px;
  top: ${BaseHeightOffset.foot};
  left: ${IMAGE_WIDTH / 2 - 50};
`;

export const TakeButtonWrapper = styled.View`
  position: absolute;
  align-self: center;
  justify-content: center;
  align-items: center;
  bottom: 20;
`;
