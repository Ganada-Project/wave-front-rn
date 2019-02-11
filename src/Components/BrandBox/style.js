import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../constants';
const window = Dimensions.get('window');

export const Wrapper = styled.TouchableOpacity`
  width: 100%;
  height: ${window.height / 4.5};
  flex: 1;
  box-shadow: 2px 2px 5px ${theme.grayColor};
  background-color: white;
  border-radius: 15px;
  margin-bottom: 15px;
  /* overflow: hidden; */
`;

export const ImageArea = styled.View`
  width: 100%;
  height: 70%;
  border-top-left-radius: 15;
  border-top-right-radius: 15;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  overflow: hidden;
`;

export const BrandImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const TextArea = styled.View`
  width: 100%;
  height: 30%;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: ${(props) => (props.selected ? theme.pointColor : 'white')};
  opacity: ${(props) => (props.selected ? '0.8' : '1')};
`;

export const BrandTitle = styled.Text`
  color: ${(props) => (props.selected ? '#ffffff' : theme.textColor)};
  font-size: 16px;
  font-weight: bold;
`;
