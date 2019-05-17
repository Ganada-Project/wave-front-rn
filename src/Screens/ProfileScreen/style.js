import styled from 'styled-components/native';
import { StyleSheet, Image } from 'react-native';
import { theme, TopBarHeight } from '../../constants';
import { IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_RADIUS } from './constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // paddingTop: TopBarHeight,
  },
  header_profile: {
    width: '100%',
    height: '22%',
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
  },
  text_sub: {
    color: theme.textColor,
    fontSize: 15,
  },

  text_subsub: {
    fontSize: 12,
  },

  profile_image_container: {
    flex: 1,
    paddingLeft: '5%',
    paddingTop: '5%',
  },

  case1: {
    flex: 1,
    backgroundColor: 'red',
  },
  case2: {
    flex: 3,
    backgroundColor: 'green',
  },
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
