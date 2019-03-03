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
    justifyContent: 'center',
  },
  body: {
    paddingTop: 10,
    flex: 2,
  },
  body__stylesWrapper: {
    flexDirection: 'column',
  },
  header__title: {
    fontSize: 20,
    color: theme.textColor,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
