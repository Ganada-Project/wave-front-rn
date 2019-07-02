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
  AuthTopBarOption,
} from '../../constants';

// local actions
import { checkNicknameAction } from './actions';

import saga from './saga';
import reducer from './reducer';
import { makeSelectChecking, makeSelectOverlap } from './selectors';

export class Info1Screen extends Component {
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
      name: '',
      age: '',
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
      nickname, name, errorText, overlap, age,
    } = this.state;
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
            label="사이즈 카드 이름"
            onChangeText={(text) => this.setState({ name: text })}
            autoFocus={false}
          />
          <RegisterForm
            label="나이"
            onChangeText={(text) => this.setState({ age: text })}
            autoFocus={false}
          />
        </View>
        <View style={styles.footer}>
          <FullWidthButton
            disabled={!!(age === '' || name === '') || overlap}
            onPress={this.navigateToPassword}
            content="다음 단계"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

Info1Screen.propTypes = {
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

const withSaga = injectSaga({ key: 'info1', saga });
const withReducer = injectReducer({ key: 'info1', reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withSaga,
  withReducer,
)(Info1Screen);
