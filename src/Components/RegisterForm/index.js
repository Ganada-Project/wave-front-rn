import React, { Component } from 'react';
import { TextInput, Text, View } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import { TextInputMask } from 'react-native-masked-text';
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
      keyboardType,
      onChangePhoneText,
      errorText,
      value,
      phoneValue,
      loading,
      phone,
      autoFocus,
    } = this.props;
    return (
      <View
        style={{
          marginBottom: 30,
          height: 50,
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              color: theme.whiteColor,
              fontSize: 16,
              fontWeight: '700',
            }}
          >
            {label}
          </Text>
          {loading ? (
            <View style={{ marginLeft: 10 }}>
              <BarIndicator size={10} color={theme.whiteColor} />
            </View>
          ) : null}
        </View>
        {phone ? (
          <TextInputMask
            ref={(ref) => (this.myDateText = ref)}
            type="custom"
            keyboardType="numeric"
            value={phoneValue}
            autoFocus={autoFocus}
            onChangeText={onChangePhoneText}
            style={styles.input}
            options={{
              mask: '999-9999-9999',
            }}
          />
        ) : (
          <TextInput
            onChangeText={onChangeText}
            value={value}
            autoFocus={autoFocus}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={keyboardType}
            style={styles.input}
          />
        )}

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
  onChangePhoneText: PropTypes.func,
  errorText: PropTypes.string,
  value: PropTypes.string,
  phoneValue: PropTypes.string,
  loading: PropTypes.bool,
  phone: PropTypes.bool,
  keyboardType: PropTypes.string,
  autoFocus: PropTypes.bool,
};

RegisterForm.defaultProps = {
  keyboardType: 'default',
  autoFocus: true,
};

export default RegisterForm;
