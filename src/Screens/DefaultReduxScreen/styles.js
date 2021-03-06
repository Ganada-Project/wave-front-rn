import { StyleSheet } from 'react-native';

import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { theme } from '../../constants';

export const Wrapper = styled.View`
  flex: 1;
  /* height: 500px; */
  background-color: ${theme.backgroundColor};
  padding: 80px 25px 0px 25px;
`;

export const Header = styled.View`
  flex: 0.1;
  padding-top: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Body = styled.ScrollView`
  flex: 1;
  /* padding: 15px 0; */
  /* border: 1px red solid; */
`;

export const HeaderText = styled.Text`
  font-size: 20px;
  color: ${theme.textColor};
  font-weight: bold;
`;

export const SubText = styled.Text`
  margin-top: 5px;
  margin-bottom: 15px;
  color: ${theme.textColor};
`;
