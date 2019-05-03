import { StyleSheet } from 'react-native';
import { theme, TopBarHeight } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: TopBarHeight,
  },
  header: {
    flex: 0.1,
  },
  body: {
    flex: 1.5,
    paddingTop: 10,
  },
  body__text: {
    marginBottom: 10,
    color: theme.whiteColor,
  },
  body__text__second: {
    marginBottom: 30,
    color: theme.whiteColor,
  },
  body__text__third: {
    marginTop: 30,
    color: theme.whiteColor,
  },
  header__title: {
    fontSize: 20,
    color: theme.whiteColor,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 16,
    color: theme.whiteColor,
    alignSelf: 'flex-end',
  },
  footer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
