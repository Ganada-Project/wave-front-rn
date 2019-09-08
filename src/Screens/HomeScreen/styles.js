import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { theme } from '../../constants';

export const IconWrapper = Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 35,
  },
  header: {
    flex: 0.5,
    justifyContent: 'center',
  },
  header__menu__wrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
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
    width: 55,
    height: 40,
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
  confirmModal: {
    flex: 0.4,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
  },
  modalTitle: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 5,
  },
  hairline: {
    borderColor: theme.grayColor,
    borderBottomWidth: 0.5,
    width: '100%',
    height: 0.5,
    marginVertical: 25,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default styles;
