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
    flex: 1,
  },
  body: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
