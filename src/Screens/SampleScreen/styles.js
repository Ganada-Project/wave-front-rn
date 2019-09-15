import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { theme } from '../../constants';
const window = Dimensions.get('window');
export const Wrapper = styled.View`
  flex: 1;
  /* height: 500px; */
  background-color: rgba(255, 255, 255, 0.85);
  padding: 80px 25px 0px 25px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Body = styled.ScrollView`
  flex: 1;
  /* padding: 15px 0; */
  /* border: 1px red solid; */
`;
