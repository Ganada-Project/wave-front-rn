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
    fontSize: 28,
    color: theme.pointColor,
    fontWeight: 'bold',
  },
  footer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
