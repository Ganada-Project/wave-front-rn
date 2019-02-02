import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  View
} from "react-native";
import { Overlay } from "react-native-elements";
import PropTypes from "prop-types";

import styles from "./style";
import { theme } from "../../constants";
const window = Dimensions.get("window");

export class StyleBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, imgUrl, index, onPress, selected, divider } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            ...styles.wrapper,
            width: window.width / divider,
            height: window.width / divider,
            marginRight: index % 3 === 2 ? 0 : 10,
            justifyContent: selected ? "center" : "flex-end"
          }}
          borderRadius={1}
          source={{ uri: imgUrl }}
        >
          <Overlay
            style={{
              ...styles.overlay,
              backgroundColor: selected ? theme.pointColor : "black"
            }}
          />
          {selected ? (
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../../Assets/Icons/Register/style-check.png")}
            />
          ) : (
            <Text
              style={{
                ...styles.text,
                marginBottom: selected ? 0 : 10
              }}
            >
              {name}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

StyleBox.propTypes = {
  name: PropTypes.string,
  imgUrl: PropTypes.string,
  index: PropTypes.number,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
  divider: PropTypes.number
};

export default StyleBox;
