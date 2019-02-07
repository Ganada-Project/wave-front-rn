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
