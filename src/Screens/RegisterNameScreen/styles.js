import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pointColor,
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  header: {
    flex: 0.2,
  },
  body: {
    flex: 1.5,
    paddingTop: 10,
  },
  header__title: {
    fontSize: 20,
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
