import React, { Component } from 'react';

import PropTypes from 'prop-types';

// react-native-navigation
import { Navigation } from 'react-native-navigation';

import { Button, Icon } from 'react-native-elements';

import { Text, View, TextInput } from 'react-native';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// reselect -> reducer에 있는 프로퍼티들 선택 툴
import { createStructuredSelector } from 'reselect';

// injectSaga
import injectSaga from '../../utils/injectSaga';
import DAEMON from '../../utils/constants';
import injectReducer from '../../utils/injectReducer';

// local saga
import saga from './saga';
import reducer from './reducer';

// local actions
import { requestLoginAction } from './actions';

// local selectors
import { makeSelectErrors } from './selectors';

// local styles
import styles from './style';

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
    };
  }

  // componentDidUpdate(nextProps, nextState) {
  //   const { loading } = this.props;
  //   if (loading && !nextProps.loading) {
  //     startTabScreens();
  //   }
  // }

  onClickSignInWithphone = () => {
    const { phone, password } = this.state;
    const { onClickTryLoginBtn } = this.props;
    onClickTryLoginBtn({ phone, password });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="휴대폰번호를 입력하세요"
          auto
          autoCapitalize="none"
          onChangeText={(phone) => this.setState({ phone })}
        />
        <TextInput
          placeholder="비밀번호를 입력하세요"
          onChangeText={(password) => this.setState({ password })}
        />
        <Button onPress={this.onClickSignInWithphone} title="로그인" />
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
  erros: makeSelectErrors(),
});
const mapDispatchToProps = (dispatch) => ({
  onClickTryLoginBtn: ({ phone, password }) => dispatch(
    requestLoginAction({
      phone,
      password,
    }),
  ),
});
const withSaga = injectSaga({ key: 'signIn', saga, mode: DAEMON });
const withReducer = injectReducer({ key: 'signIn', reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withReducer,
  withSaga,
)(SignInScreen);
