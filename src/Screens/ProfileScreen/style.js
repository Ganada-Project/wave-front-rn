import styled from 'styled-components/native';
import { StyleSheet, Image, Platform, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { theme, TopBarHeight } from '../../constants';
import { IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_RADIUS } from './constants';

export const ListButton = Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    // paddingTop: TopBarHeight,
  },
  header_profile: {
    width: '100%',
    flexDirection: 'row',
  },

  header_text_container: {
    flex: 2,
    paddingLeft: '5%',
    paddingTop: '5%',
    flexDirection: 'column',
  },
  header_text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: '5%'
  },
  text_sub: {
    color: theme.textColor,
    fontSize: 15,
    marginBottom: '3%'
  },

  text_subsub: {
    fontSize: 12,
    marginBottom: '10%'
  },

  profile_image_container: {
    flex: 1,
    paddingLeft: '5%',
    paddingTop: '5%',
  },

  case1: {
    // flex: 1,
    backgroundColor: 'red',
  },
  case2: {
    // flex: 3,
    backgroundColor: 'green',
  },
  button_container: {
    flex: 1,
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  buttons: {
    borderBottomWidth: 1,
    borderBottomColor: theme.grayColor,
    paddingTop: '5%',
    paddingBottom: '5%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button_text: {
    alignSelf: 'flex-start'
  },
  button_textsub: {
    color: theme.textColor,
    fontSize: 12,
  },
  button_icon: {
    alignSelf: 'flex-end'
  }
});

export const ImageContainer = styled(Image)`
  align-items: center;
  justify-content: center;
  position: relative;
  left: 30;
  width: ${IMAGE_WIDTH};
  height: ${IMAGE_HEIGHT};
  border-radius: ${IMAGE_RADIUS};
`;

export default styles;
