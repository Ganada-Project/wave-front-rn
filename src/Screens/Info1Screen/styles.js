import { StyleSheet } from 'react-native';
import { theme, TopBarHeight } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: TopBarHeight,
  },
  header: {
    flex: 0.2,
    alignItems: 'flex-start',
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
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
