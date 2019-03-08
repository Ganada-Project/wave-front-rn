import styled from 'styled-components/native';
import {
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
const window = Dimensions.get('window');
const Button = Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;

export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const PhotoItem = styled.Image`
  width: ${window.width / 3}px;
  height: ${window.width / 3}px;
  margin-bottom: 1px;
  margin-right: 1px;
  /* :nth-child(3n) {
    margin-right: 0px;
  } */
`;

export const PhotoButton = styled(Button)``;
