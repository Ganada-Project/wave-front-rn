import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, Image } from "react-native";
import { Button } from "react-native-elements";
import { Navigation } from "react-native-navigation";
import styles from "./styles";
import { FullWidthButton } from "../../Components";
import { theme } from "../../constants";
import WaveLogoWhite from "../../Assets/Logos/wave-logo-white.png";

export class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateToGender = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: "wave.gender"
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../../Assets/Logos/wave-logo-white.png")}
          />
          <Text style={styles.header__title}>Surf in style.</Text>
          <Text style={styles.header__subtitle}>세상의 스타일, 내 손안에.</Text>
        </View>
        <View style={styles.footer}>
          <FullWidthButton icon="facebook" content="페이스북으로 로그인" />
          <FullWidthButton icon="call" invert content="휴대번호로 로그인" />
          <Button onPress={this.navigateToGender} title="회원가입" />
        </View>
      </View>
    );
  }
}

WelcomeScreen.propTypes = {
  componentId: PropTypes.string
};

export default WelcomeScreen;
