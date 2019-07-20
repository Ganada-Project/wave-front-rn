import React, { Component } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
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
import { RegisterForm, FullWidthButton, GenderBox } from '../../Components';
import {
  keyboardVerticalOffset,
  keyboardBehavior,
  AuthTopBarOption,
} from '../../constants';

// local actions
import { checkNicknameAction, signUpRequestAction } from './actions';

import saga from './saga';
import reducer from './reducer';
import { makeSelectChecking, makeSelectOverlap } from './selectors';

const genderData = [
  {
    id: 2,
    name: '여성',
    icon: require('../../Assets/Icons/Register/woman.png'), //eslint-disable-line
    iconWhite: require('../../Assets/Icons/Register/woman-white.png'), //eslint-disable-line
  },
  {
    id: 1,
    name: '남성',
    icon: require('../../Assets/Icons/Register/man.png'), //eslint-disable-line
    iconWhite: require('../../Assets/Icons/Register/man-white.png'), //eslint-disable-line
  },
];

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
      selectedGenderId: 0,
      errorText: null,
    };
  }

  signUp = () => {
    const { name, age, selectedGenderId } = this.state;
    const { componentId, phone, password } = this.props;
    console.log(`폰: ${phone}`);
    console.log(`패스워드 : ${password}`);
    console.log(`이름: ${name}`);
    console.log(`나이 :${age}`);
    console.log(`성별 : + ${selectedGenderId}`);
  };

  checkNickname = (text) => {
    const { checkNickname } = this.props;
    this.setState({ nickname: text }, () => {
      checkNickname({ nickname: text });
    });
  };

  handleGender = (id) => {
    this.setState({ selectedGenderId: id });
  };

  onPressClose = () => {
    const { componentId } = this.props;
    Navigation.dismissModal(componentId);
  };

  render() {
    const { checking } = this.props;
    const {
      nickname,
      name,
      errorText,
      overlap,
      age,
      selectedGenderId,
    } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={keyboardBehavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={styles.header}>
          {/* <ContainerButton onPress={this.onPressClose}>
            <Icon
              name="close"
              size={30}
              type="simple-line-icon"
              color={theme.textColor}
            />
          </ContainerButton> */}
        </View>
        <View style={styles.body}>
          <RegisterForm
            label="이름"
            onChangeText={(text) => this.setState({ name: text })}
            autoFocus={false}
          />
          <RegisterForm
            label="나이"
            onChangeText={(text) => this.setState({ age: text })}
            autoFocus={false}
            keyboardType="numeric"
          />
          <View style={{ flexDirection: 'row' }}>
            {genderData.map((gender) => (
              <GenderBox
                onPress={this.handleGender}
                icon={gender.icon}
                iconWhite={gender.iconWhite}
                id={gender.id}
                selectedGenderId={selectedGenderId}
                key={`gender-${gender.id}`}
                name={gender.name}
                divider={6.5}
              />
            ))}
          </View>
        </View>
        <View style={styles.footer}>
          <FullWidthButton
            disabled={
              !!(age === '' || name === '') || overlap || selectedGenderId === 0
            }
            onPress={this.signUp}
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
  password: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  checking: makeSelectChecking(),
  overlap: makeSelectOverlap(),
});

const mapDispatchToProps = (dispatch) => ({
  checkNickname: ({ nickname }) => {
    dispatch(checkNicknameAction({ nickname }));
  },
  signUp: ({ signUpObj }) => {
    dispatch(signUpRequestAction({ signUpObj }));
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
