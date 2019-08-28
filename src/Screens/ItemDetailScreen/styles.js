import { StyleSheet, Dimensions } from 'react-native';
import { theme, TopBarHeight } from '../../constants';
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // paddingTop: TopBarHeight,
    backgroundColor: 'blue',
  },
  swiper__container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
    borderColor: 'red',
  },
  body: {},
  body__text: {
    marginBottom: 30,
    color: theme.whiteColor,
  },
  header__title: {
    fontSize: 20,
    color: theme.whiteColor,
    fontWeight: 'bold',
  },
  guideImage: {
    width: window.width,
    height: 200,
  },
  footer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
