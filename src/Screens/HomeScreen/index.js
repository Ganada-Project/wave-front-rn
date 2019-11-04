import React, { Component, Fragment } from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { View, Animated, Easing, Text } from 'react-native';
import { Icon } from 'react-native-elements';
// navigation
import { Navigation } from 'react-native-navigation';
// 움직이즌 그라데이션
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
// 햅틱 효과
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
// pinterest ui
import Masonry from 'react-native-masonry';
// redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// reselect -> reducer에 있는 프로퍼티들 선택 툴
import { createStructuredSelector } from 'reselect';

import ActionButton from 'react-native-action-button';

// injectSaga
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import styles, {
  IconWrapper,
  NavItemWrapper,
  InitialText,
  Wrapper,
  Header,
  Body,
  ItemInfo,
  SizeCardAlertWrapper,
  SizeCardAlertText,
} from './styles';
import { FullWidthButton } from '../../Components';

// local saga
import saga from './saga';
import reducer from './reducer';

import randomColor from 'randomcolor';

import {
  gradientPreset,
  gradientSpeed,
  lightGradientPreset,
  theme,
} from '../../constants';
import WaveLogoWhite from '../../Assets/Logos/wave-logo-color.png';
import InitialImage from './Images/initial.png';
import {
  getSizeCardRequestAction,
  setSizeCardRequestAction,
  getItemsRequestAction,
} from './actions';
import {
  makeSelectSizeCards,
  makeSelectSelectedSizeCard,
  makeSelectItems,
} from './selectors';
import SelectedSizeCard from './SelectedSizeCard';
import { makeSelectUser } from '../App/selectors';
import { alertSetSizeCard } from './utils/alert';
import { SizeCardAlert } from './SizeCardAlert';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const fastProps = {
  // onProgress: { e => console.log(e.nativeEvent.loaded / e.nativeEvent.total) },
  resizeMode: FastImage.resizeMode.cover,
};

export class HomeScreen extends Component {
  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
      statusBar: {
        style: 'dark',
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
    this.sizeCardAlertTop = new Animated.Value(-20);
    this.sizeCardAlertOpacity = new Animated.Value(0);
  }

  componentDidMount() {
    const { getSizeCards, getItems } = this.props;
    getSizeCards();
    getItems();
  }

  componentDidUpdate(prevProps) {
    const { selectedSizeCard, getItems } = this.props;

    if (!prevProps.selectedSizeCard.get('id') && selectedSizeCard.get('id')) {
      console.log('init');
    }
    if (
      prevProps.selectedSizeCard.get('id') !== null &&
      selectedSizeCard.get('id') !== prevProps.selectedSizeCard.get('id')
    ) {
      this.alertSizeCardChanged();
      console.log(selectedSizeCard.toJS());
    }
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
    const { selectedSizeCard, sizeCards, user, setSizeCard } = this.props;
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'wave.sizeCardList',
              passProps: {
                selectedSizeCard,
                sizeCards,
                user,
                setSizeCard,
              },
            },
          },
        ],
      },
    });
  };

  alertSizeCardChanged = () => {
    const { sizeCardAlertOpacity, sizeCardAlertTop } = this;
    ReactNativeHapticFeedback.trigger('impactMedium', options);
    alertSetSizeCard({ sizeCardAlertOpacity, sizeCardAlertTop });
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
    const { selectedSizeCard, sizeCards, items, componentId } = this.props;
    const isEmpty = sizeCards.size === 0;
    const renderedItems = items.toJS().map(x => {
      return {
        ...x,
        onPress: () => {
          Navigation.push(componentId, {
            component: {
              name: 'wave.itemDetail',
              passProps: {
                item: x,
              },
            },
          });
        },
        renderFooter: () => {
          return (
            <ItemInfo>
              <ItemInfo.Maker>{x.maker}</ItemInfo.Maker>
              <ItemInfo.Price>{x.price}</ItemInfo.Price>
            </ItemInfo>
          );
        },
      };
    });

    return (
      <AnimatedLinearGradient
        customColors={gradientPreset}
        speed={gradientSpeed}
      >
        <Wrapper>
          <Header>
            <View style={styles.header__selected_card}>
              <SelectedSizeCard
                sizeCard={selectedSizeCard}
                empty={isEmpty}
                onPress={this.onPressSelectedSizeCard}
              />
            </View>
            <View style={styles.header__menu__wrapper}>
              <NavItemWrapper onPress={this.navigateToPoseInfoMe}>
                <Icon
                  type="octicons"
                  name="search"
                  color={theme.textColor}
                  size={20}
                />
              </NavItemWrapper>
              <NavItemWrapper onPress={this.navigateToPoseInfoOther}>
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
          </Header>
          <Body>
            <SizeCardAlert
              sizeCardAlertOpacity={this.sizeCardAlertOpacity}
              sizeCardAlertTop={this.sizeCardAlertTop}
            />
            {isEmpty ? (
              <Fragment>
                <FastImage
                  source={InitialImage}
                  style={styles.initialImage}
                  resizeMode="contain"
                />
                <InitialText>사이즈 카드가 아직 없어요.</InitialText>
                <InitialText>신체치수를 측정해서 </InitialText>
                <InitialText>편리한 쇼핑을 즐겨보세요</InitialText>
              </Fragment>
            ) : (
              <Masonry
                bricks={renderedItems}
                coloums={2}
                spacing={2}
                customImageComponent={FastImage}
                customImageProps={fastProps}
                imageContainerStyle={{ borderRadius: 20 }}
                onPress={this.onPressItem}
              />
              // <View />
            )}
          </Body>
        </Wrapper>
      </AnimatedLinearGradient>
    );
  }
}

HomeScreen.propTypes = {
  user: PropTypes.instanceOf(Object),
  componentId: PropTypes.string,
  getSizeCards: PropTypes.func,
  setSizeCard: PropTypes.func,
  selectedSizeCard: PropTypes.instanceOf(Object),
  sizeCards: PropTypes.instanceOf(List),
  items: PropTypes.instanceOf(List),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  sizeCards: makeSelectSizeCards(),
  selectedSizeCard: makeSelectSelectedSizeCard(),
  items: makeSelectItems(),
});

const mapDispatchToProps = dispatch => ({
  getSizeCards: () => dispatch(getSizeCardRequestAction()),
  setSizeCard: ({ sizeCard, componentId }) =>
    dispatch(setSizeCardRequestAction({ sizeCard, componentId })),
  getItems: () => dispatch(getItemsRequestAction()),
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
