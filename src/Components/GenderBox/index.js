import React, { Component } from 'react';
import {
  TouchableOpacity, Dimensions, Text, View, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import { theme } from '../../constants';
const window = Dimensions.get('window');

export class GenderBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      id,
      selectedGenderId,
      name,
      icon,
      iconWhite,
      onPress,
      divider,
    } = this.props;

    return (
      <TouchableOpacity
        style={{
          ...styles.wrapper,
          width: window.width / divider,
          height: window.width / divider,
          borderWidth: 1,
          borderColor:
            selectedGenderId !== id ? theme.grayColor : theme.pointColor,
          backgroundColor:
            selectedGenderId !== id ? theme.whiteColor : theme.pointColor,
        }}
        onPress={() => onPress(id)}
      >
        <Image
          source={selectedGenderId !== id ? icon : iconWhite}
          style={{ width: 60, height: 60 }}
        />
        <Text
          style={{
            ...styles.text,
            color: selectedGenderId !== id ? theme.textColor : theme.whiteColor,
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  }
}

GenderBox.propTypes = {
  id: PropTypes.number,
  selectedGenderId: PropTypes.number,
  name: PropTypes.string,
  icon: PropTypes.number,
  iconWhite: PropTypes.number,
  onPress: PropTypes.func,
  divider: PropTypes.number,
};

export default GenderBox;
