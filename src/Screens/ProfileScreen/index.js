/**
 * Author: ShinHyunJong
 * Redux & Saga connected index.js
 * Copyright: Ganada Project
 */
import React, { Component } from 'react';

// prop-types
import PropTypes from 'prop-types';

// react-native
import {
  View, Text, Container, ScrollView,
} from 'react-native';

import { Button, Icon } from 'react-native-elements';

// react-native-navigation
import { Navigation } from 'react-native-navigation';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// reselect -> reducer에 있는 프로퍼티들 선택 툴
import { createStructuredSelector } from 'reselect';

// injectSaga
import injectSaga from '../../utils/injectSaga';
import DAEMON from '../../utils/constants';

// local selectors
import { makeSelectUserData } from './selectors';

// local action
import { trySignOutAction } from './actions';
import { fetchUserAction } from '../App/actions';

// local saga
import saga from './saga';

// local styles
import styles, { ImageContainer, ListButton } from './style';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    const { fetchUser } = this.props;
    fetchUser();
  }

  // navigateTo = () => {
  //   const { componentId } = this.props;
  //   Navigation.push(componentId, {
  //     component: {
  //       name: 'wave.app',
  //       options: {
  //         topBar: {
  //           title: {
  //             text: 'sample',
  //           },
  //         },
  //       },
  //     },
  //   });
  // };

  onPressSignOut = () => {
    const { onPressSignOut, componentId } = this.props;
    onPressSignOut({ componentId });
  };

  render() {
    const { userData } = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header_profile}>
          <View style={styles.header_text_container}>
            <Text style={styles.header_text}>
              {userData.getIn(['bio', 'name'])}
            </Text>
            <Text style={styles.text_sub}>4회 이용 / 20</Text>

            <Text style={styles.text_subsub}>
              새로운 패션 소비 습관을 형성중이네요.
            </Text>
          </View>
          <View style={styles.profile_image_container}>
            <ImageContainer
              imageStyle={{
                resizeMode: 'cover',
              }}
              source={{
                uri:
                  'https://pbs.twimg.com/profile_images/557525379800236033/eQ2qiSs7_400x400.jpeg',
              }}
            />
          </View>
        </View>
        <View style={styles.button_container}>
          <ListButton style={styles.buttons}>
            <Text style={styles.button_text}>내 정보 수정</Text>
            <Icon
              name="user"
              type="simple-line-icon"
              size={20}
              style={styles.button_icon}
            />
          </ListButton>
        </View>
        <View style={styles.button_container}>
          <ListButton style={styles.buttons}>
            <Text style={styles.button_text}>내 신체치수</Text>
            <Text>마지막 측정 : 2개월 전</Text>
            <Icon
              name="tape-measure"
              type="material-community"
              size={20}
              style={styles.button_icon}
            />
          </ListButton>
        </View>
        <View style={styles.button_container}>
          <ListButton style={styles.buttons}>
            <View style={styles.button_text}>
              <Text>옷걸이 크레딧 & 쿠폰</Text>
              <Text style={styles.button_textsub}>
                보유중인 옷걸이 :
                {userData.getIn(['shopping', 'hanger'])}
              </Text>
            </View>
            <Icon
              name="tape-measure"
              type="material-community"
              size={20}
              style={styles.button_icon}
            />
          </ListButton>
        </View>
        <View style={styles.button_container}>
          <ListButton style={styles.buttons}>
            <Text style={styles.button_text}>리뷰</Text>
            <Icon
              name="tape-measure"
              type="material-community"
              size={20}
              style={styles.button_icon}
            />
          </ListButton>
        </View>
        <View style={styles.button_container}>
        <ListButton style={styles.buttons}>
            <Text style={styles.button_text}>알림</Text>
            <Icon
              name="tape-measure"
              type="material-community"
              size={20}
              style={styles.button_icon}
            />
          </ListButton>
        </View>
        <View style={styles.button_container}>
        <ListButton style={styles.buttons}>
            <Text style={styles.button_text}>도움말</Text>
            <Icon
              name="tape-measure"
              type="material-community"
              size={20}
              style={styles.button_icon}
            />
          </ListButton>
        </View>
        <View style={styles.button_container}>
        <ListButton style={styles.buttons}>
            <Text style={styles.button_text}>친구 초대하기</Text>
            <Icon
              name="tape-measure"
              type="material-community"
              size={20}
              style={styles.button_icon}
            />
          </ListButton>
        </View>
        <View style={styles.button_container}>
        <ListButton style={styles.buttons}>
            <Text style={styles.button_text}>설정</Text>
            <Icon
              name="tape-measure"
              type="material-community"
              size={20}
              style={styles.button_icon}
            />
          </ListButton>
        </View>
        <View style={styles.button_container}>
        <ListButton style={styles.buttons}>
            <Text style={styles.button_text}>라이센스 및 서비스 정보</Text>
            <Icon
              name="tape-measure"
              type="material-community"
              size={20}
              style={styles.button_icon}
            />
          </ListButton>
        </View>
        <View style={styles.container}>
          <Button onPress={this.onPressSignOut} title="로그아웃" />
        </View>
      </ScrollView>
      // <View>

    // </View>
    );
  }
}

ProfileScreen.propTypes = {
  componentId: PropTypes.string,
  userData: PropTypes.instanceOf(Object),
  onPressSignOut: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
});

const mapDispatchToProps = (dispatch) => ({
  onPressSignOut: ({ componentId }) => {
    dispatch(trySignOutAction({ componentId }));
  },
  fetchUser: () => {
    dispatch(fetchUserAction());
  },
});

const withSaga = injectSaga({ key: 'profile', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withSaga,
)(ProfileScreen);
