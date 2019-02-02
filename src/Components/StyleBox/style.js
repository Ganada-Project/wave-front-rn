import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../constants';
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'column',
    borderRadius: 10,
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
    fontSize: 16,
    color: theme.whiteColor,
  },
});

export default styles;
