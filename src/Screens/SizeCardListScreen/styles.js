import styled from 'styled-components/native';
import { theme } from '../../constants';

export const Wrapper = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.85);
  padding: 80px 25px 20px 25px;
`;

export const Body = styled.View`
  flex: 10;
  padding-top: 10px;
`;

export const HeadderText = styled.Text`
  font-size: 20px;
  color: ${theme.textColor};
  font-weight: bold;
`;
