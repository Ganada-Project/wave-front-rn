import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

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
  },
  registerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer__register: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default styles;
