import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { RegisterForm } from '../../../Components';
import { onChangeUserVerifyNumberAction } from '../actions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlePhoneNumber = (text) => {
    const { onChangeUserVerifyNumber } = this.props;
    onChangeUserVerifyNumber({ number: text });
  };

  render() {
    const { errorText, userVerifyNumber } = this.props;
    return (
      <RegisterForm
        invert
        label="인증 번호"
        keyboardType="numeric"
        value={userVerifyNumber}
        onChangeText={this.handlePhoneNumber}
        errorText={errorText}
      />
    );
  }
}

Form.propTypes = {
  errorText: PropTypes.string,
  onChangeUserVerifyNumber: PropTypes.func,
  userVerifyNumber: PropTypes.number,
};

const mapDispatchToProps = (dispatch) => ({
  onChangeUserVerifyNumber: ({ number }) => dispatch(onChangeUserVerifyNumberAction({ number })),
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Form);
