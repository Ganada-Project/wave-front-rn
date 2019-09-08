import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modal';
import styles, { IconWrapper } from './styles';
import { FullWidthButton } from '../../Components';
import {
  gradientPreset,
  gradientSpeed,
  lightGradientPreset,
} from '../../constants';
import WaveLogoWhite from '../../Assets/Logos/wave-logo-white.png';
import SizeCardAddButton from './SizeCardAddButton';

export class HomeScreen extends Component {
  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
      statusBar: {
        style: 'light',
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  navigateToPoseInfoMe = () => {
    const { componentId } = this.props;
    this.setState({ modalOpen: false }, () => {
      Navigation.push(componentId, {
        component: {
          name: 'wave.poseInfo',
          passProps: {
            isMe: true,
          },
        },
      });
    });
  };

  navigateToPoseInfoOther = () => {
    const { componentId } = this.props;
    this.setState({ modalOpen: false }, () => {
      Navigation.push(componentId, {
        component: {
          name: 'wave.poseInfo',
          passProps: {
            isMe: false,
          },
        },
      });
    });
  };

  navigateToProfile = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.profile',
      },
    });
  };

  render() {
    const { modalOpen } = this.state;
    return (
      <AnimatedLinearGradient
        customColors={gradientPreset}
        speed={gradientSpeed}
      >
        <View style={styles.container}>
          <Modal isVisible={modalOpen}>
            <View style={styles.confirmModal}>
              <Text style={styles.modalTitle}>준비되셨나요?</Text>
              <View style={styles.hairline} />
              <Text style={styles.modalText}>내가 서 있을 때 착한 친구와</Text>
              <Text style={styles.modalText}>
                너무 두껍지 않은 옷만 입고 있으면
              </Text>
              <Text style={styles.modalText}>수월하게 진행됩니다</Text>
              <FullWidthButton
                onPress={this.navigateToPoseInfoMe}
                content="네"
                height={40}
              />
            </View>
          </Modal>
          <View style={styles.header}>
            <View style={styles.header__menu__wrapper}>
              <Image style={styles.logo} source={WaveLogoWhite} />
              <IconWrapper onPress={this.navigateToProfile}>
                <Icon
                  type="simple-line-icon"
                  name="settings"
                  color="white"
                  size={30}
                />
              </IconWrapper>
            </View>
            {/* <Text style={styles.header__title}>웨어비</Text> */}
            <Text style={styles.header__title}>안녕하세요.</Text>
            <Text style={styles.header__subtitle}>
              패션 브랜드마다 사이즈 측정법이 다르데요.
            </Text>
          </View>
          <View style={styles.footer}>
            <SizeCardAddButton
              onPressAdd={this.openModal}
              onPressMe={this.navigateToPoseInfoMe}
              onPressOther={this.navigateToPoseInfoOther}
            />
          </View>
        </View>
      </AnimatedLinearGradient>
    );
  }
}

HomeScreen.propTypes = {
  componentId: PropTypes.string,
};

export default HomeScreen;
