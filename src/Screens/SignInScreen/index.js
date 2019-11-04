import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Text, View, KeyboardAvoidingView } from 'react-native';

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

// global components
import { RegisterForm, FullWidthButton } from '../../Components';
import { keyboardVerticalOffset, keyboardBehavior } from '../../constants';

class SignInScreen extends Component {
  static options() {
    return {
      topBar: {
        noBorder: true,
        background: {
          color: 'white',
        },
      },
      statusBar: {
        style: 'dark',
      },
    };
  }

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
    const { phone, password } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={keyboardBehavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={styles.header}>
          <Text style={styles.header__title}>로그인 정보</Text>
        </View>
        <View style={styles.body}>
          <RegisterForm
            label="휴대폰번호"
            phone
            phoneValue={phone}
            onChangePhoneText={text => this.setState({ phone: text })}
          />
          <RegisterForm
            label="비밀번호"
            onChangeText={text => this.setState({ password: text })}
            autoFocus={false}
          />
          <Text>계정을 잊으셨나요?</Text>
        </View>
        <View style={styles.footer}>
          <FullWidthButton
            disabled={!!(phone === '' || password === '')}
            onPress={this.onClickSignInWithphone}
            content="로그인"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

SignInScreen.propTypes = {
  onClickTryLoginBtn: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  erros: makeSelectErrors(),
});
const mapDispatchToProps = dispatch => ({
  onClickTryLoginBtn: ({ phone, password }) =>
    dispatch(
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
