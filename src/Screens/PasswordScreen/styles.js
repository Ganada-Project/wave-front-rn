import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.whiteColor,
    paddingHorizontal: 25,
    paddingVertical: 35,
  },
  header: {
    flex: 0.5,
  },
  body: {
    flex: 1.5,
  },
  body__text: {
    marginBottom: 30,
  },
  header__title: {
    fontSize: 28,
    color: theme.pointColor,
    fontWeight: 'bold',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
