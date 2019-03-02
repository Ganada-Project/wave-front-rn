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
    flex: 0.3,
  },
  body: {
    flex: 1.5,
    flexDirection: 'column',
  },
  body__text: {
    color: theme.textColor,
    fontSize: 18,
    marginBottom: 5,
  },
  footer: {
    flex: 0.5,
    flexDirection: 'column',
  },

  header__title: {
    fontSize: 20,
    color: theme.textColor,
    fontWeight: 'bold',
  },
});

export default styles;
