import styled from 'styled-components/native';
import { Animated, Dimensions } from 'react-native';
const window = Dimensions.get('window');
export const SizeCardAlertWrapper = styled(Animated.View)`
  position: absolute;
  width: ${window.width};
  height: 40px;
  z-index: 0;
`;

export const SizeCardAlertText = styled.Text`
  color: white;
  font-weight: bold;
`;
