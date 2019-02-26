import styled from 'styled-components/native';
import { theme } from '../../constants';

export const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 45px 15px 10px 15px;
`;

export const Header = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SearchBar = styled.TouchableOpacity`
  width: 100%;
  height: 90%;
  box-shadow: 2px 2px 5px ${theme.grayColor};
  background-color: white;
  border-radius: 5px;
`;

export const Body = styled.ScrollView`
  flex: 10;
  padding-top: 20px;
`;

export const BodyBrandArea = styled.ScrollView``;

export const BodySubjectText = styled.Text`
  font-size: 20px;
  color: ${theme.textColor};
  font-weight: bold;
  margin-bottom: 16px;
`;
