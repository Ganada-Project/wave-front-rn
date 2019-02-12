import React, { Component } from 'react';
import { TextInput, Text, View } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
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
      label,
      placeholder,
      onChangeText,
      errorText,
      value,
      loading,
    } = this.props;
    return (
      <View
        style={{
          marginBottom: 30,
          height: 50,
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <View style={{ flexDirection: 'row', width: '20%' }}>
          <Text
            style={{ color: theme.textColor, fontSize: 16, fontWeight: '700' }}
          >
            {label}
          </Text>
          {loading ? <BarIndicator size={10} color={theme.pointColor} /> : null}
        </View>
        <TextInput
          onChangeText={onChangeText}
          value={value}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: theme.pointColor,
            paddingTop: 10,
            paddingLeft: 5,
            paddingBottom: 10,
            color: theme.textColor,
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
