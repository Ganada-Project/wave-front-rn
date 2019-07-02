import { StyleSheet } from 'react-native';
import { theme, fonts } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: theme.pointColor,
    padding: 25,
  },
  header: {
    flex: 0.6,
    justifyContent: 'center',
  },
  header__title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: fonts.NanumGothic,
    marginBottom: 10,
  },
  registerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: fonts.NanumGothic,
  },
  logo: {
    width: 70,
    height: 60,
  },
  header__subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: '#ffffff',
    fontFamily: fonts.NanumGothic,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer__register: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: fonts.NanumGothic,
  },
});

export default styles;
