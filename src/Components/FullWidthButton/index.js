import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./style";

export class FullWidthButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Button =
      Platform.OS === "ios" ? TouchableOpacity : TouchableWithoutFeedback;
    const { content, invert, icon, onPress, disabled } = this.props;
    if (disabled) {
      return (
        <View
          style={
            invert ? styles.disabledInvertContainer : styles.disabledContainer
          }
        >
          {icon ? (
            <Icon
              style={invert ? styles.invertIcon : styles.defaultIcon}
              name={icon}
            />
          ) : null}
          <Text style={invert ? styles.invertText : styles.defaultText}>
            {content}
          </Text>
        </View>
      );
    }
    return (
      <Button
        onPress={onPress}
        style={invert ? styles.invertContainer : styles.defaultContainer}
      >
        {icon ? (
          <Icon
            size={16}
            name={icon}
            style={invert ? styles.invertIcon : styles.defaultIcon}
          />
        ) : null}
        <Text style={invert ? styles.invertText : styles.defaultText}>
          {content}
        </Text>
      </Button>
    );
  }
}

FullWidthButton.propTypes = {
  content: PropTypes.string,
  icon: PropTypes.string,
  invert: PropTypes.bool,
  onPress: PropTypes.func,
  disabled: PropTypes.bool
};

export default FullWidthButton;
