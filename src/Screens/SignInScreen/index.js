import React, { Component } from 'react';

import PropTypes from 'prop-types';

// react-native-navigation
import { Navigation } from 'react-native-navigation';

import {
  Button, Icon, Text, View, TextInput,
} from '@shoutem/ui';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// reselect -> reducer에 있는 프로퍼티들 선택 툴
import { createStructuredSelector } from 'reselect';

// injectSaga
import injectSaga from '../../../utils/injectSaga';
import DAEMON from '../../../utils/constants';

// local saga
import saga from './saga';

// local actions
import { requestLoginAction } from './actions';

// local selectors
import { makeSelectLoading, makeSelectSuccessful } from './selectors';

// local styles
import styles from './style';

import { startTabScreens } from '../../index';

export class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  // componentDidUpdate(nextProps, nextState) {
  //   const { loading } = this.props;
  //   if (loading && !nextProps.loading) {
  //     startTabScreens();
  //   }
  // }

  onClickSignInWithEmail = () => {
    const { email, password } = this.state;
    const { onClickTryLoginBtn } = this.props;
    onClickTryLoginBtn({ email, password });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="이메일을 입력하세요"
          auto
          autoCapitalize="none"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="비밀번호를 입력하세요"
          onChangeText={(password) => this.setState({ password })}
        />
        <Button onPress={this.onClickSignInWithEmail}>
          <Icon name="call" />
          <Text>휴대전화로 로그인</Text>
        </Button>
        <Button styleName="secondary">
          <Icon name="facebook" />
          <Text>페이스북으로 로그인</Text>
        </Button>
      </View>
    );
  }
}

SignInScreen.propTypes = {
  componentId: PropTypes.string,
  onClickTryLoginBtn: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  successful: makeSelectSuccessful(),
});
const mapDispatchToProps = (dispatch) => ({
  onClickTryLoginBtn: ({ email, password }) => dispatch(
    requestLoginAction({
      email,
      password,
    })
  ),
});
const withSaga = injectSaga({ key: 'signIn', saga, mode: DAEMON });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withConnect,
  withSaga
)(SignInScreen);
