/**
 * Author: ShinHyunJong
 * Redux & Saga connected index.js
 * Copyright: Ganada Project
 */
import React, { Component } from 'react';

// prop-types
import PropTypes from 'prop-types';

// react-native
import { View, Text } from 'react-native';

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
import injectReducer from '../../utils/injectReducer';

// local selectors
import {} from './selectors';

// local action
import {} from './actions';

// local saga
import saga from './saga';

// local styles
import styles from './style';

class DefaultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
  }

  navigateTo = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.app',
        options: {
          topBar: {
            title: {
              text: 'sample',
            },
          },
        },
      },
    });
  };

  render() {
    return <View />;
  }
}

DefaultScreen.propTypes = {
  componentId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({});

const withSaga = injectSaga({ key: 'default', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withSaga,
)(DefaultScreen);
