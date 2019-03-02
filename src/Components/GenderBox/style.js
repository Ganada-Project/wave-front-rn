import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../constants';

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'column',
    borderRadius: 50,
    overflow: 'hidden',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    marginTop: 10,
  },
});

export default styles;
