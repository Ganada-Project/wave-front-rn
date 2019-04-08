import { StyleSheet } from 'react-native';
import { theme, fonts } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pointColor,
    padding: 25,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  header__title: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: fonts.NanumGothic,
  },
  registerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: fonts.NanumGothic,
  },
  logo: {
    width: 100,
    height: 70,
  },
  header__subtitle: {
    fontSize: 20,
    marginTop: 5,
    color: '#ffffff',
    fontWeight: 'bold',
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
