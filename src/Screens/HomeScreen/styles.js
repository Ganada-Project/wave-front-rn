import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
} from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../constants';
const window = Dimensions.get('window');

export const Wrapper = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.85);
  padding: 60px 25px 20px 25px;
`;

export const Header = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
`;

export const Body = styled.View`
  flex: 10;
  justify-content: center;
  align-items: center;
`;

export const IconWrapper = Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;

export const NavItemWrapper = styled(IconWrapper)`
  width: 45px;
  height: 45px;
  border: 1px solid ${theme.grayColor};
  border-radius: 15px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  margin-right: ${(props) => (props.last ? '0px' : '5px')};
`;

export const InitialText = styled.Text`
  color: ${theme.textColor};
  margin-bottom: 5px;
`;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header__selected_card: {
    flex: 1.1,
    marginRight: 10,
  },
  header__menu__wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  settingIcon: {
    width: 30,
    height: 30,
  },
  header__subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: '#ffffff',
  },
  footer: {
    flex: 10,
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
  initialImage: {
    width: window.width,
    height: 270,
  },
});

export default styles;
