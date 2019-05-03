import React, { Component } from 'react';
import {
  KeyboardAvoidingView, Platform, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// reselect -> reducer에 있는 프로퍼티들 선택 툴
import { createStructuredSelector } from 'reselect';

import AnimatedLinearGradient from 'react-native-animated-linear-gradient';

// injectSaga
import { Navigation } from 'react-native-navigation';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

// react-native-navigation
import styles from './styles';

// global components
import { RegisterForm, FullWidthButton } from '../../Components';
import {
  keyboardVerticalOffset,
  keyboardBehavior,
  gradientPreset,
  gradientSpeed,
  AuthTopBarOption,
} from '../../constants';

// local actions
import { checkNicknameAction } from './actions';

import saga from './saga';
import reducer from './reducer';
import { makeSelectChecking, makeSelectOverlap } from './selectors';

export class RegisterNameScreen extends Component {
  static options() {
    return {
      topBar: {
        ...AuthTopBarOption,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.overlap && nextProps.overlap) {
      return { errorText: '닉네임이 이미 존재합니다', overlap: true };
    }
    if (prevState.overlap && !nextProps.overlap) {
      return { errorText: null, overlap: false };
    }
    return null;
  }

  constructor(props) {
    const { overlap } = props;
    super(props);
    this.state = {
      nickname: '',
      name: '',
      overlap,
      errorText: null,
    };
  }

  navigateToPassword = () => {
    const { nickname, name } = this.state;
    const { componentId, phone } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.password',
        passProps: { nickname, name, phone },
      },
    });
  };

  checkNickname = (text) => {
    const { checkNickname } = this.props;
    this.setState({ nickname: text }, () => {
      checkNickname({ nickname: text });
    });
  };

  render() {
    const { checking } = this.props;
    const {
      nickname, name, errorText, overlap,
    } = this.state;
    return (
      <AnimatedLinearGradient
        customColors={gradientPreset}
        speed={gradientSpeed}
      >
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
              label="닉네임"
              onChangeText={this.checkNickname}
              loading={checking}
              errorText={errorText}
            />
            <RegisterForm
              label="이름"
              onChangeText={(text) => this.setState({ name: text })}
              autoFocus={false}
            />
          </View>
          <View style={styles.footer}>
            <FullWidthButton
              disabled={!!(nickname === '' || name === '') || overlap}
              onPress={this.navigateToPassword}
              invert
              content="다음 단계"
            />
          </View>
        </KeyboardAvoidingView>
      </AnimatedLinearGradient>
    );
  }
}

RegisterNameScreen.propTypes = {
  componentId: PropTypes.string,
  phone: PropTypes.string,
  checking: PropTypes.bool,
  checkNickname: PropTypes.func,
  overlap: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  checking: makeSelectChecking(),
  overlap: makeSelectOverlap(),
});

const mapDispatchToProps = (dispatch) => ({
  checkNickname: ({ nickname }) => {
    dispatch(checkNicknameAction({ nickname }));
  },
});

const withSaga = injectSaga({ key: 'registerName', saga });
const withReducer = injectReducer({ key: 'registerName', reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withSaga,
  withReducer,
)(RegisterNameScreen);
