import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  header: {
    flex: 0.1,
  },
  body: {
    flex: 1,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  header__title: {
    fontSize: 20,
    color: theme.textColor,
    fontWeight: 'bold',
  },
  footer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
