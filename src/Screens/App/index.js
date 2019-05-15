/*
 * Author: ShinHyunJong
 * Application Name : Wave
 * Corpyright : Ganada Project
 */
import React, { Component } from 'react';

// prop-types
import PropTypes from 'prop-types';

// react-native
import { View } from 'react-native';

// react-native-navigation
import { Navigation } from 'react-native-navigation';

// import { firebase } from '@';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// reselect -> reducer에 있는 프로퍼티들 선택 툴
import { createStructuredSelector } from 'reselect';

// injectSaga
import { setCustomText } from 'react-native-global-props';
import firebase from 'react-native-firebase';
import injectSaga from '../../utils/injectSaga';
import DAEMON from '../../utils/constants';

import { makeSelectUser } from './selectors';

// local action
import { fetchUserAction } from './actions';

// local saga
import saga from './saga';
import { fonts, theme } from '../../constants';

const customTextProps = {
  style: {
    fontSize: 16,
    fontFamily: fonts.NanumGothic,
  },
};

setCustomText(customTextProps);

class App extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: false,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
  }

  async componentDidMount() {
    const { fetchUser } = this.props;
    fetchUser();
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      // user has a device token
      console.log(fcmToken);
    } else {
      console.log('not have token');
      // user doesn't have a device token yet
    }
  }

  render() {
    return <View />;
  }
}

App.propTypes = {
  fetchUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => {
    dispatch(fetchUserAction());
  },
});

const withSaga = injectSaga({ key: 'app', saga, mode: DAEMON });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withSaga,
)(App);
