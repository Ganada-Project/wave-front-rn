import styled from 'styled-components/native';
import {
  Dimensions,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../constants';
const window = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  itemImage: {
    width: '100%',
    height: 140,
    borderRadius: 10,
  },
});

export const ItemWrapperButton = Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;

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

export const Body = styled.View`
  flex: 10;
  padding-top: 20px;
`;

export const ItemLeft = styled.View`
  width: ${window.width / 2.5};
  margin-left: 15px;
  margin-right: 5px;
  margin-top: 20px;
`;

export const ItemRight = styled.View`
  width: ${window.width / 2.5};
  margin-left: 5px;
  margin-right: 15px;
  margin-top: 20px;
`;

export const BodyBrandArea = styled.ScrollView``;

export const BodySubjectText = styled.Text`
  font-size: 20px;
  color: ${theme.textColor};
  font-weight: bold;
  margin-bottom: 16px;
`;
