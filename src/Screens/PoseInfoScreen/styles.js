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
    flex: 1,
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
    flex: 1,
    flexDirection: 'column',
  },

  header__title: {
    fontSize: 28,
    color: theme.pointColor,
    fontWeight: 'bold',
  },
});

export default styles;
