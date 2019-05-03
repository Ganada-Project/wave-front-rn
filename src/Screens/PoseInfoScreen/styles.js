import { StyleSheet } from 'react-native';
import { theme, TopBarHeight } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: TopBarHeight,
  },
  header: {
    flex: 0.4,
  },
  header__title: {
    fontSize: 20,
    color: theme.whiteColor,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  header__subTitle: {
    color: theme.whiteColor,
  },
  body: {},
  body__text: {
    color: theme.whiteColor,
    fontSize: 18,
    marginBottom: 5,
  },
  swiper__container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    paddingVertical: 20,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  swiper__headerInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.pointColor,
  },
  swiper__subInfo: {
    fontSize: 14,
    color: theme.pointColor,
  },
  guideImage: {
    width: '100%',
    height: 115,
    marginVertical: 30,
  },
  footer: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
