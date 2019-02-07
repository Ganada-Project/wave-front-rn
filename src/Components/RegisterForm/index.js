import React, { Component } from 'react';
import { TextInput, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import { theme } from '../../constants';

export class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      label, placeholder, onChangeText, errorText, value,
    } = this.props;
    return (
      <View style={{ marginBottom: 30, height: 50, width: '100%' }}>
        <Text
          style={{ color: theme.textColor, fontSize: 16, fontWeight: '700' }}
        >
          {label}
        </Text>
        <TextInput
          onChangeText={onChangeText}
          value={value}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: theme.pointColor,
            paddingTop: 10,
            paddingLeft: 5,
            paddingBottom: 10,
          }}
        />
        {errorText !== null ? (
          <Text style={{ color: 'red' }}>{errorText}</Text>
        ) : null}
      </View>
    );
  }
}

RegisterForm.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  errorText: PropTypes.string,
  value: PropTypes.string,
};

export default RegisterForm;
