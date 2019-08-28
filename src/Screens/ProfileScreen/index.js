/**
 * Author: ShinHyunJong
 * Redux & Saga connected index.js
 * Copyright: Ganada Project
 */
import React, { Component } from 'react';

// prop-types
import PropTypes from 'prop-types';

// react-native
import { View, Text, Container } from 'react-native';

import { Button } from 'react-native-elements';

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
import styles, { ImageContainer } from './style';

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
      <View style={styles.container}>
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
        <View>
          <Text>내 정보 수정</Text>
        </View>
        <View>
          <Text>내 신체치수</Text>
          <Text>마지막 측정 : 2개월 전</Text>
        </View>
        <View>
          <Text>옷걸이 크레딧 & 쿠폰</Text>
          <Text>보유중인 옷걸이 : 23</Text>
        </View>
        <View>
          <Text>리뷰</Text>
        </View>
        <View>
          <Text>알림</Text>
        </View>
        <View>
          <Text>도움말</Text>
        </View>
        <View>
          <Text>친구 초대하기</Text>
        </View>
        <View>
          <Text>설정</Text>
        </View>
        <View>
          <Text>라이센스 및 서비스 정보</Text>
        </View>
        <View style={styles.container}>
          <Button onPress={this.onPressSignOut} title="로그아웃" />
        </View>
      </View>
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
