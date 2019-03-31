import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FullWidthButton } from '../../../Components';
import {
  makeSelectUserVerifyNumber,
  makeSelectVerifyNumber,
} from '../selectors';

export class Button extends Component {
  navigateToPassword = () => {
    const {
      componentId,
      phone,
      Navigation,
      verifyNumber,
      userVerifyNumber,
    } = this.props;
    // Navigation.push(componentId, {
    //   component: {
    //     name: 'wave.password',
    //   },
    // });
    if (verifyNumber !== userVerifyNumber) {
      console.log('틀림');
    } else {
      Navigation.push(componentId, {
        component: {
          name: 'wave.registerName',
          passProps: {
            phone,
          },
        },
      });
    }
  };

  render() {
    const { userVerifyNumber } = this.props;
    console.log(userVerifyNumber);
    return (
      <FullWidthButton
        onPress={this.navigateToPassword}
        disabled={userVerifyNumber === null}
        invert
        content="다음 단계"
      />
    );
  }
}

Button.propTypes = {
  componentId: PropTypes.string,
  Navigation: PropTypes.object,
  verifyNumber: PropTypes.string,
  userVerifyNumber: PropTypes.string,
  phone: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  verifyNumber: makeSelectVerifyNumber(),
  userVerifyNumber: makeSelectUserVerifyNumber(),
});

const withConnect = connect(mapStateToProps);
export default compose(withConnect)(Button);
