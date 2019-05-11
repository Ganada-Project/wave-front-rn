import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { theme, TopBarHeight } from '../../constants';

export const GenderWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const LabelText = styled.Text`
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffffff;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: TopBarHeight,
  },
  header: {
    flex: 0.5,
  },
  body: {
    flex: 1.5,
  },
  header__title: {
    fontSize: 20,
    color: theme.whiteColor,
    fontWeight: 'bold',
  },
  footer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
