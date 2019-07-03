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
  activeDot: {
    backgroundColor: theme.pointColor,
    width: 45,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
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
    flexDirection: 'column',
  },
  swiper__headerInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.textColor,
  },
  swiper__subInfo: {
    fontSize: 14,
    color: theme.pointColor,
  },
  swiper__imageArea: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiper__descArea: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
