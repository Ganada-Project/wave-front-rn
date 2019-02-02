/**
 * Author: ShinHyunJong
 * Redux & Saga connected index.js
 * Copyright: Ganada Project
 */
import React, { Component } from 'react';

// prop-types
import PropTypes from 'prop-types';

// react-native
import {} from 'react-native';

// @shoutem-ui
import { View, Text, Button } from '@shoutem/ui';

// react-native-navigation
import { Navigation } from 'react-native-navigation';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// reselect -> reducer에 있는 프로퍼티들 선택 툴
import { createStructuredSelector } from 'reselect';

// injectSaga
import injectSaga from '../../../utils/injectSaga';
import DAEMON from '../../../utils/constants';

// local selectors
import {} from './selectors';

// local action
import { trySignOutAction } from './actions';

// local saga
import saga from './saga';

// local styles
import styles from './style';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
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
    return (
      <View>
        <Button onPress={this.onPressSignOut}>
          <Text>로그아웃</Text>
        </Button>
      </View>
    );
  }
}

ProfileScreen.propTypes = {
  componentId: PropTypes.string,
  onPressSignOut: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  onPressSignOut: ({ componentId }) => {
    dispatch(trySignOutAction({ componentId }));
  },
});

const withSaga = injectSaga({ key: 'profile', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withConnect,
  withSaga
)(ProfileScreen);
