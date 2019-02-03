import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { FullWidthButton } from '../../Components';

class PoseInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header__title}>마지막으로,</Text>
        </View>
        <View style={styles.body}>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.body__text}>
              웨이브는 전신이 나온 이미지 한장으로 신체치수를 계산해주어요
            </Text>
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.body__text}>
              - 나중에 언제라도 재측정 할 수 있어요
            </Text>
            <Text style={styles.body__text}>
              - 측정시 올린 이미지는 그 누구도 열람 불가능!
            </Text>
            <Text style={styles.body__text}>
              - 나중에 언제라도 재측정 할 수 있어요
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <FullWidthButton
            onPress={this.navigateTo}
            invert
            content="촬영하기"
          />
        </View>
      </View>
    );
  }
}

export default PoseInfoScreen;
