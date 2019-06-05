import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-elements';
import { theme, AuthTopBarOption } from '../../constants';
import styles from './styles';

class ItemDetailScreen extends Component {
  static options() {
    return {
      topBar: {
        ...AuthTopBarOption,
      },
      bottomTabs: {
        visible: false,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;
    console.log(item);
    return (
      <ScrollView style={styles.container}>
        <Swiper
          style={{
            borderWidth: 2,
            borderColor: 'yellow',
          }}
          activeDot={(
            <View
              style={{
                backgroundColor: theme.pointColor,
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          )}
        >
          {item.images.map((image) => (
            <View key={`itemDetail-${image}`} style={styles.swiper__container}>
              <FastImage
                style={styles.guideImage}
                source={{ uri: image }}
                resizeMode={FastImage.resizeMode.conver}
              />
            </View>
          ))}
        </Swiper>
      </ScrollView>
    );
  }
}

ItemDetailScreen.propTypes = {
  item: PropTypes.object,
};

export default ItemDetailScreen;
