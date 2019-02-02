import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Icon, Button } from "react-native-elements";
import styles from "./style";

export class FullWidthButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
        title={content}
        icon={<Icon name={icon} />}
        onPress={onPress}
        titleStyle={invert ? styles.invertText : styles.defaultText}
        buttonStyle={invert ? styles.invertContainer : styles.defaultContainer}
      />
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
