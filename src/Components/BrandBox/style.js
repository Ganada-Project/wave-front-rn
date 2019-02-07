import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../constants';
const window = Dimensions.get('window');

export const Wrapper = styled.View`
  width: 100%;
  height: ${window.height / 4};
  flex: 1;
  box-shadow: 2px 2px 5px ${theme.grayColor};
  background-color: white;
  border-radius: 15px;
  /* overflow: hidden; */
`;

export const ImageArea = styled.View`
  width: 100%;
  height: 65%;
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
  height: 35%;
  justify-content: center;
  align-items: center;
`;

export const BrandTitle = styled.Text`
  color: ${theme.textColor};
  font-size: 16px;
  font-weight: bold;
`;
