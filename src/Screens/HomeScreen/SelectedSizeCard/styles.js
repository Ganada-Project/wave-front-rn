import styled from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';
import { theme } from '../../../constants';

export const ShadowBox = styled.View`
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fefefe;
  border-radius: 9px;
  width: 100%;
  height: 100%;
  padding: 5px 10px;
`;

export const InfoWrapper = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const SizeCardName = styled.Text`
  margin-left: 5px;
  font-weight: bold;
  color: ${theme.textColor};
`;

export const ProfileWrapper = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
`;
