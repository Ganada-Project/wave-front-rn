import React, { Component } from 'react';

// react-native
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { TextInputMask } from 'react-native-masked-text';
import PropTypes from 'prop-types';
// redux-saga things
import { Navigation } from 'react-native-navigation';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import styles from './styles';
import { RegisterForm, FullWidthButton } from '../../Components';
import { keyboardBehavior, keyboardVerticalOffset } from '../../constants';
import saga from './saga';
import reducer from './reducer';
import { makeSelectVerifyNumber, makeSelectVerifyLoading } from './selectors';
import { verifyPhoneNumberAction } from './actions';

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
    return { verifyLoading: nextProps.verifyLoading };
  }

  constructor(props) {
    super(props);
    this.state = {
      isSent: false,
      phone: '',
      userVerifyNumber: '',
      verifyLoading: false,
      errorText: null,
    };
  }

  sendPhoneNumber = () => {
    const { phone } = this.state;
    const { verifyPhoneNumber } = this.props;
    // verifyPhoneNumber({ number: phone });
    this.setState({ isSent: true });
  };

  navigateToPassword = () => {
    const {
      componentId, verifyNumber, name, nickname, gender,
    } = this.props;
    const { userVerifyNumber, phone } = this.state;
    // Navigation.push(componentId, {
    //   component: {
    //     name: 'wave.password',
    //   },
    // });
    if (verifyNumber !== userVerifyNumber) {
      this.setState({ errorText: '인증번호가 올바르지 않습니다' });
    } else {
      Navigation.push(componentId, {
        component: {
          name: 'wave.password',
          passProps: {
            name,
            nickname,
            phone,
            gender,
          },
        },
      });
    }
  };

  render() {
    const {
      isSent, number, userVerifyNumber, errorText, phone,
    } = this.state;
    if (!isSent) {
      return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={keyboardBehavior}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <View style={styles.header}>
            <Text style={styles.header__title}>휴대번호를 입력하세요.</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.body__text}>진짜 사람인지만 판별해볼게요.</Text>
            <Text style={styles.body__text__second}>
              인공지능은 우리만 필요해요.
            </Text>
            <RegisterForm
              label="휴대폰 번호"
              phone
              value={number}
              onChangeText={(text) => this.setState({ phone: text })}
            />
            <Text style={styles.body__text__third}>
              해당번호를 4자리의 인증번호를 보내드립니다.
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
          <Text style={styles.header__title}>인증번호를 입력하세요.</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.body__text}>{`${phone}에 전송받은`}</Text>
          <Text style={styles.body__text__second}>
            4자리 인증번호를 입력하세요.
          </Text>
          <RegisterForm
            label="인증 번호"
            value={userVerifyNumber}
            onChangeText={(text) => this.setState({ userVerifyNumber: text })}
            errorText={errorText}
          />
          <Text style={styles.body__text__third}>인증번호가 안와요.</Text>
        </View>
        <View style={styles.footer}>
          <FullWidthButton
            onPress={this.navigateToPassword}
            // disabled={userVerifyNumber === ''}
            invert
            content="다음 단계"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

PhoneVerifyScreen.propTypes = {
  componentId: PropTypes.string,
  verifyPhoneNumber: PropTypes.func,
  verifyLoading: PropTypes.bool,
  verifyNumber: PropTypes.string,
  name: PropTypes.string,
  gender: PropTypes.string,
  nickname: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  verifyNumber: makeSelectVerifyNumber(),
  verifyLoading: makeSelectVerifyLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  verifyPhoneNumber: ({ number }) => dispatch(verifyPhoneNumberAction({ number })),
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
