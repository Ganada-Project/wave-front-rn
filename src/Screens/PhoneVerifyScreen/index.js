import React, { Component } from 'react';

// react-native
import {
  KeyboardAvoidingView, Text, View, Image,
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
// redux-saga things
import { Navigation } from 'react-native-navigation';
import TimerCountdown from 'react-native-timer-countdown';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import styles from './styles';
import { RegisterForm, FullWidthButton } from '../../Components';
import { keyboardBehavior, keyboardVerticalOffset } from '../../constants';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectVerifyNumber,
  makeSelectVerifyLoading,
  makeSelectChecking,
  makeSelectOverlap,
} from './selectors';
import { verifyPhoneNumberAction, checkPhoneNumberAction } from './actions';
import Form from './Form';
import Button from './Button';

export class PhoneVerifyScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        noBorder: true,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.verifyLoading && !nextProps.verifyLoading) {
      return { isSent: true };
    }
    if (!prevState.overlap && nextProps.overlap) {
      return { errorText: '휴대폰번호가 이미 존재합니다', overlap: true };
    }
    if (prevState.overlap && !nextProps.overlap) {
      return { errorText: null, overlap: false };
    }
    return { verifyLoading: nextProps.verifyLoading };
  }

  constructor(props) {
    super(props);
    this.state = {
      isSent: false,
      phone: '',
      verifyLoading: false,
      errorText: null,
      overlap: props.overlap,
    };
  }

  sendPhoneNumber = () => {
    const { phone } = this.state;
    const { verifyPhoneNumber } = this.props;
    // verifyPhoneNumber({ number: phone });
    this.setState({ isSent: true });
  };

  handlePhoneNumber = (text) => {
    const { checkPhoneNumber } = this.props;
    this.setState({ phone: text }, () => {
      checkPhoneNumber({ number: text });
    });
  };

  handleTimeOut = () => {
    this.setState({ isSent: false, phone: '' });
  };

  render() {
    const { checking, componentId } = this.props;
    const {
      isSent, number, errorText, phone,
    } = this.state;
    if (!isSent) {
      return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={keyboardBehavior}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <View style={styles.header}>
            <Text style={styles.header__title}>회원가입</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.body__text}>
              본인의 휴대폰번호를 입력하세요.
            </Text>
            <Text style={styles.body__text__second}>
              헤당번호로 4자리의 인증번호가 발송됩니다.
            </Text>
            <RegisterForm
              phone
              label="휴대폰 번호"
              phoneValue={phone}
              loading={checking}
              onChangePhoneText={this.handlePhoneNumber}
              errorText={errorText}
            />
            <Text style={styles.body__text__third}>
              가입하면 웨이브의 약관, 데이터 정책 및 쿠키 정책에 동의하게
              됩니다.
            </Text>
          </View>
          <View style={styles.footer}>
            <FullWidthButton
              onPress={this.sendPhoneNumber}
              invert
              disabled={number === ''}
              content="발송하기"
            />
          </View>
        </KeyboardAvoidingView>
      );
    }
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={keyboardBehavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={styles.header}>
          <Text style={styles.header__title}>인증번호</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.body__text}>{`${phone}에 전송받은`}</Text>
          <Text style={styles.body__text__second}>
            4자리 인증번호를 입력하세요.
          </Text>
          <Form errorText={errorText} />
          <TimerCountdown
            initialSecondsRemaining={2000 * 60}
            onTimeElapsed={this.handleTimeOut}
            formatSecondsRemaining={(milliseconds) => {
              const remainingSec = Math.round(milliseconds / 1000);
              const seconds = parseInt((remainingSec % 60).toString(), 10);
              const minutes = parseInt(
                ((remainingSec / 60) % 60).toString(),
                10,
              );
              const hours = parseInt((remainingSec / 3600).toString(), 10);
              const s = seconds < 10 ? `0${seconds}` : seconds;
              const m = minutes < 10 ? `0${minutes}` : minutes;
              let h = hours < 10 ? `0${hours}` : hours;
              h = h === '00' ? '' : `${h}:`;
              return `${h + m}:${s}`;
            }}
            allowFontScaling
            style={styles.timerText}
          />
          <Text style={styles.body__text__third}>인증번호 다시받기</Text>
        </View>
        <View style={styles.footer}>
          <Button Navigation={Navigation} componentId={componentId} phone={phone} errotText={errorText} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

PhoneVerifyScreen.propTypes = {
  componentId: PropTypes.string,
  verifyPhoneNumber: PropTypes.func,
  checkPhoneNumber: PropTypes.func,
  overlap: PropTypes.bool,
  checking: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  verifyNumber: makeSelectVerifyNumber(),
  verifyLoading: makeSelectVerifyLoading(),
  checking: makeSelectChecking(),
  overlap: makeSelectOverlap(),
});

const mapDispatchToProps = (dispatch) => ({
  verifyPhoneNumber: ({ number }) => dispatch(verifyPhoneNumberAction({ number })),
  checkPhoneNumber: ({ number }) => dispatch(checkPhoneNumberAction({ number })),
});

const withSaga = injectSaga({ key: 'phoneVerify', saga });
const withReducer = injectReducer({ key: 'phoneVerify', reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withSaga,
  withReducer,
)(PhoneVerifyScreen);
