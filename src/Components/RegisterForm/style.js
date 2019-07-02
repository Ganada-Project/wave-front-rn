import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: theme.grayColor,
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 10,
    color: theme.textColor,
  },
});

export default styles;
