import React, { Component } from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import Modal from 'react-native-modal';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// reselect -> reducer에 있는 프로퍼티들 선택 툴
import { createStructuredSelector } from 'reselect';

import ActionButton from 'react-native-action-button';

// injectSaga
import FastImage from 'react-native-fast-image';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import styles, {
  IconWrapper,
  NavItemWrapper,
  InitialText,
  Wrapper,
  Header,
  Body,
} from './styles';
import { FullWidthButton } from '../../Components';

// local saga
import saga from './saga';
import reducer from './reducer';

import {
  gradientPreset,
  gradientSpeed,
  lightGradientPreset,
  theme,
} from '../../constants';
import WaveLogoWhite from '../../Assets/Logos/wave-logo-color.png';
import InitialImage from './Images/initial.png';
import SizeCardAddButton from './SizeCardAddButton';
import { getSizeCardRequestAction } from './actions';
import { makeSelectSizeCards, makeSelectSelectedSizeCard } from './selectors';
import SelectedSizeCard from './SelectedSizeCard';

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

  componentDidMount() {
    const { getSizeCards } = this.props;
    getSizeCards();
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

  navigateToSizeCardList = () => {
    const { selectedSizeCard, sizeCards } = this.props;
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'wave.sizeCardList',
              passProps: {
                selectedSizeCard,
                sizeCards,
              },
            },
          },
        ],
      },
    });
  };

  onPressSelectedSizeCard = () => {
    const { sizeCards } = this.props;
    if (sizeCards.size === 0) {
      this.navigateToPoseInfoMe();
    } else {
      this.navigateToSizeCardList();
    }
  };

  render() {
    const { selectedSizeCard, sizeCards } = this.props;
    const { modalOpen } = this.state;
    return (
      <AnimatedLinearGradient
        customColors={gradientPreset}
        speed={gradientSpeed}
      >
        <Wrapper>
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
          <Header>
            <View style={styles.header__selected_card}>
              <SelectedSizeCard
                name={selectedSizeCard.name}
                empty={sizeCards.size === 0}
                onPress={this.onPressSelectedSizeCard}
              />
            </View>
            <View style={styles.header__menu__wrapper}>
              <NavItemWrapper onPress={this.navigateToProfile}>
                <Icon
                  type="octicons"
                  name="search"
                  color={theme.textColor}
                  size={20}
                />
              </NavItemWrapper>
              <NavItemWrapper onPress={this.navigateToProfile}>
                <Icon
                  type="simple-line-icon"
                  name="bell"
                  color={theme.textColor}
                  size={20}
                />
              </NavItemWrapper>
              <NavItemWrapper last onPress={this.navigateToProfile}>
                <Icon
                  type="simple-line-icon"
                  name="settings"
                  color={theme.textColor}
                  size={20}
                />
              </NavItemWrapper>
            </View>
            {/* <Text style={styles.header__title}>웨어비</Text> */}
          </Header>
          <Body>
            <FastImage
              source={InitialImage}
              style={styles.initialImage}
              resizeMode="contain"
            />
            <InitialText>사이즈 카드가 아직 없어요.</InitialText>
            <InitialText>신체치수를 측정해서 </InitialText>
            <InitialText>편리한 쇼핑을 즐겨보세요</InitialText>
          </Body>
        </Wrapper>
      </AnimatedLinearGradient>
    );
  }
}

HomeScreen.propTypes = {
  componentId: PropTypes.string,
  getSizeCards: PropTypes.func,
  selectedSizeCard: PropTypes.object,
  sizeCards: PropTypes.instanceOf(List),
};

const mapStateToProps = createStructuredSelector({
  sizeCards: makeSelectSizeCards(),
  selectedSizeCard: makeSelectSelectedSizeCard(),
});

const mapDispatchToProps = (dispatch) => ({
  getSizeCards: () => dispatch(getSizeCardRequestAction()),
});

const withSaga = injectSaga({ key: 'home', saga });
const withReducer = injectReducer({ key: 'home', reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withReducer,
  withSaga,
)(HomeScreen);
