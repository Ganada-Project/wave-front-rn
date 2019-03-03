import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.whiteColor,
    paddingHorizontal: 25,
    paddingTop: 10,
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
  },
  body__text__second: {
    marginBottom: 30,
  },
  body__text__third: {
    marginTop: 30,
    color: theme.pointColor,
  },
  header__title: {
    fontSize: 20,
    color: theme.textColor,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 16,
    color: theme.pointColor,
    alignSelf: 'flex-end',
  },
  footer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
