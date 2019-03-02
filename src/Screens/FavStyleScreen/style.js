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
    flex: 0.2,
  },
  body: {
    flex: 2,
  },
  body__stylesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  header__title: {
    fontSize: 20,
    color: theme.textColor,
    fontWeight: 'bold',
  },
  footer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
