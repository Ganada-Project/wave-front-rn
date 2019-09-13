import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { theme } from '../../../constants';
const window = Dimensions.get('window');

export const Wrapper = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${window.height / 8};
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid ${theme.grayColor};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  background-color: white;
  margin-bottom: 10px;
`;

export const ProfileWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const ProfileImageBg = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
`;

export const ContentWrapper = styled.View`
  flex: 4;
  padding-left: 15px;
  justify-content: space-between;
`;

export const TopWrapper = styled.View``;

export const DescWrapper = styled.View`
  margin-top: 2px;
  flex-direction: row;
  align-items: center;
`;

export const DescText = styled.Text`
  margin: 0 2px;
  font-size: 14px;
  color: ${theme.darkGray};
`;

export const SizeCardName = styled.Text`
  color: ${theme.textColor};
  font-weight: bold;
  font-size: 16px;
`;

export const CreatedAt = styled.Text`
  color: ${theme.darkGray};
  font-size: 12px;
`;

export const ButtonWrapper = styled.View`
  flex: 2;
  justify-content: center;
  align-items: flex-end;
`;

export const ButtonInner = styled.View`
  background-color: white;
  border-radius: 9px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 12px;
  color: ${theme.pointColor};
`;

export const MyCardWrapper = styled.View`
  padding: 2px 1px;
  border: 1px solid ${theme.grayColor};
  border-radius: 10px;
  width: 80%;
  justify-content: center;
  align-items: center;
`;

export const MyCardText = styled.Text`
  color: ${theme.darkGray};
  font-size: 10px;
`;
