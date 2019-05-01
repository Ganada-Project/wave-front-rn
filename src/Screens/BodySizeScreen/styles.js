import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import { theme } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pointColor,
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  header: {
    flex: 0.3,
  },
  body: {
    flex: 1.5,
  },
  header__title: {
    fontSize: 20,
    marginBottom: 10,
    color: theme.whiteColor,
    fontWeight: 'bold',
  },
  footer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;

export const HeightWeightWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const Height = styled.View`
  width: 47%;
  justify-content: center;
  align-items: center;
`;

export const Weight = styled.View`
  width: 47%;
  justify-content: center;
  align-items: center;
`;
