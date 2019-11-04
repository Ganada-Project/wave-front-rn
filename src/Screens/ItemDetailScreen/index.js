/**
 * Author: ShinHyunJong
 * Redux & Saga connected index.js
 * Copyright: Ganada Project
 */
import React, { Component } from 'react';

// prop-types
import PropTypes from 'prop-types';

// react-native
import { View, Text, StyleSheet, Dimensions } from 'react-native';

// react-native-navigation
import { Navigation } from 'react-native-navigation';
import Carousel from 'react-native-snap-carousel';
// redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// reselect -> reducer에 있는 프로퍼티들 선택 툴
import { createStructuredSelector } from 'reselect';

// injectSaga
import injectSaga from '../../utils/injectSaga';
import DAEMON from '../../utils/constants';
import injectReducer from '../../utils/injectReducer';

// local selectors
import {} from './selectors';

// local action
import {} from './actions';

// local saga
import saga from './saga';

// local styles
import { Wrapper, Header, Body, HeaderText, SubText } from './styles';
// global constants
import { AuthTopBarOption } from '../../constants';
import FastImage from 'react-native-fast-image';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

class ItemDetailScreen extends Component {
  static options() {
    return {
      topBar: {
        ...AuthTopBarOption,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
  }

  renderItem({ item, index }) {
    return (
      <View style={{ flex: 1 }}>
        <FastImage
          source={{ uri: item }}
          style={{ width: 300, height: 400 }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  }

  navigateTo = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.app',
        options: {
          topBar: {
            title: {
              text: 'sample',
            },
          },
        },
      },
    });
  };

  render() {
    const { item } = this.props;
    return (
      <Wrapper>
        <Header>
          <HeaderText>{item.maker}</HeaderText>
          <SubText>{item.name}</SubText>
        </Header>
        <Body>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={item.other_imgs}
            containerCustomStyle={{
              borderColor: 'blue',
              borderWidth: 1,
            }}
            contentContainerStyle={{
              borderColor: 'red',
              borderWidth: 1,
            }}
            renderItem={this.renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
          />
        </Body>
      </Wrapper>
    );
  }
}

ItemDetailScreen.propTypes = {
  componentId: PropTypes.string,
  item: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({});

const withSaga = injectSaga({ key: 'default', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withSaga,
)(ItemDetailScreen);
