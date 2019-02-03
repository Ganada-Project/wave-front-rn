import React, { Component } from 'react';

import PropTypes from 'prop-types';

// @shoutem ui
import { Button, View, Text } from 'react-native';

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

// local saga
// import saga from './saga';

import { startTabScreens } from '../../index';

class BrandScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
  }

  onPressLogout = () => {
    const { componentId, logout } = this.props;
    logout({ componentId });
  };

  render() {
    return (
      <View>
        <Text>브랜드</Text>
      </View>
    );
  }
}

BrandScreen.propTypes = {
  componentId: PropTypes.string,
  logout: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  logout: ({ componentId }) => {
    dispatch(logoutAction({ componentId }));
  },
});

// const withSaga = injectSaga({ key: 'brand', saga, mode: DAEMON });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  // withSaga
)(BrandScreen);
