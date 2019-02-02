import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

const styles = StyleSheet.create({
  disabledContainer: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 30,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    opacity: 0.5,
  },
  disabledInvertContainer: {
    backgroundColor: theme.pointColor,
    width: '100%',
    borderRadius: 30,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    opacity: 0.5,
  },
  defaultContainer: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 30,
    marginBottom: 10,
    alignItems: 'center',
    height: 55,
  },
  defaultText: {
    color: theme.pointColor,
    fontSize: 16,
    fontWeight: '700',
  },
  defaultIcon: {
    color: theme.pointColor,
  },
  invertIcon: {
    color: '#ffffff',
  },
  invertContainer: {
    backgroundColor: theme.pointColor,
    width: '100%',
    borderRadius: 30,
    marginBottom: 10,
    alignItems: 'center',
    height: 55,
  },
  invertText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default styles;
