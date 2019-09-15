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
// redux
import { compose } from 'redux';
import { connect } from 'react-redux';
// reselect -> reducer에 있는 프로퍼티들 선택 툴
import { createStructuredSelector } from 'reselect';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
// global components
import {} from '../../Components';
// global selectors
import { makeSelectUser } from '../App/selectors';

// local selectors
import { makeSelectSample } from './selectors';

// local actions
import { sampleRequestAction } from './actions';

// local sagas
import saga from './saga';
// local reducer
import reducer from './reducer';

import { theme } from '../../constants';
// local styles
import { Wrapper } from './styles';

class SampleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Wrapper></Wrapper>;
  }
}

SampleScreen.propTypes = {
  componentId: PropTypes.string,
  user: PropTypes.instanceOf(Object),
};

const mapStateToProps = createStructuredSelector({
  sample: makeSelectSample(),
  user: makeSelectUser(),
});

const mapDispatchToProps = (dispatch) => ({
  getSample: ({ componentId }) => {
    dispatch(sampleRequestAction({ componentId }));
  },
});

const withSaga = injectSaga({ key: 'sample', saga });
const withReducer = injectReducer({ key: 'sample', reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withSaga,
  withReducer,
)(SampleScreen);
