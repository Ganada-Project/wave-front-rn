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

export const PhotoItemWrapper = styled.View`
  position: relative;
  width: ${window.width / 3}px;
  height: ${window.width / 3}px;
  margin-bottom: 1px;
  margin-right: 1px;
`;

export const PhotoCheck = styled.View`
  position: absolute;
  top: 0px;
  right: 2px;
  z-index: 20;
`;

export const PhotoItem = styled.Image`
  width: 100%;
  height: 100%;

  /* :nth-child(3n) {
    margin-right: 0px;
  } */
`;

export const SelectedPhoto = styled.Image`
  width: ${window.width};
  height: ${window.width};
  margin-bottom: 1px;
`;

export const PhotoButton = styled(Button)``;
