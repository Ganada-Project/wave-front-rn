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
      errorText,
      value,
      loading,
      phone,
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
              color: theme.textColor,
              fontSize: 16,
              fontWeight: '700',
            }}
          >
            {label}
          </Text>
          {loading ? (
            <View style={{ marginLeft: 10 }}>
              <BarIndicator size={10} color={theme.pointColor} />
            </View>
          ) : null}
        </View>
        {phone ? (
          <TextInputMask
            ref={(ref) => (this.myDateText = ref)}
            type="custom"
            keyboardType="numeric"
            style={styles.input}
            options={{
              mask: '999-9999-9999',
            }}
          />
        ) : (
          <TextInput
            onChangeText={onChangeText}
            value={value}
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
  errorText: PropTypes.string,
  value: PropTypes.string,
  loading: PropTypes.bool,
  phone: PropTypes.bool,
};

export default RegisterForm;
