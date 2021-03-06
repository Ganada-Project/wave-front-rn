import { StyleSheet } from 'react-native';

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
    marginBottom: 10,
  },
  registerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 70,
    height: 60,
  },
  header__subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: '#ffffff',
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
