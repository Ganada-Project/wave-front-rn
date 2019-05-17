import React, { Component } from 'react';

import { List } from 'immutable';

import PropTypes from 'prop-types';

import {
  Button, View, Text, FlatList,
} from 'react-native';

// react-native-navigation
import { Navigation } from 'react-native-navigation';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// reducer
import { createStructuredSelector } from 'reselect';
import FastImage from 'react-native-fast-image';
import reducer from './reducer';
import injectReducer from '../../utils/injectReducer';
// reselect -> reducer에 있는 프로퍼티들 선택 툴

// injectSaga
import injectSaga from '../../utils/injectSaga';
import DAEMON from '../../utils/constants';
import saga from './saga';

// local saga
// import saga from './saga';

import { startTabScreens } from '../../index';
import { getItemsAction } from './actions';

import {
  Wrapper,
  Header,
  Body,
  SearchBar,
  BodySubjectText,
  BodyBrandArea,
  ItemLeft,
  styles,
  ItemWrapperButton,
  ItemRight,
} from './styles';
import { makeSelectBrands } from './selectors';
import { BrandTile } from '../../Components';

class CatalogScreen extends Component {
  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    const { getItems } = this.props;
    getItems();
  }

  keyExtractor = (item, index) => item._id.toString();

  renderItem = ({ item, index }) => {
    if ((index + 1) % 2 !== 0) {
      return (
        <ItemWrapperButton onPress={() => onPress(item)}>
          <ItemLeft>
            <FastImage
              style={styles.itemImage}
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: item.images[0] }}
            />
          </ItemLeft>
          <Text>{item.name}</Text>
        </ItemWrapperButton>
      );
    }
    return (
      <ItemWrapperButton onPress={() => onPress(item)}>
        <ItemRight>
          <FastImage
            style={styles.itemImage}
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri: item.images[0] }}
          />
          <Text>{item.name}</Text>
        </ItemRight>
      </ItemWrapperButton>
    );
  };

  render() {
    const { brands } = this.props;
    return (
      <Wrapper>
        <Header>
          <SearchBar />
        </Header>
        <Body>
          <FlatList
            contentContainerStyle={styles.container}
            horizontal={false}
            numColumns={2}
            keyExtractor={this.keyExtractor}
            data={brands.toJS()}
            renderItem={this.renderItem}
            // onEndReached={onEndReached}
            // onMomentumScrollBegin={onMomentumScrollBegin}
            onEndReachedThreshold={0}
          />
        </Body>
      </Wrapper>
    );
  }
}

CatalogScreen.propTypes = {
  componentId: PropTypes.string,
  getItems: PropTypes.func,
  brands: PropTypes.instanceOf(List),
};

const mapStateToProps = createStructuredSelector({
  brands: makeSelectBrands(),
});

const mapDispatchToProps = (dispatch) => ({
  getItems: () => {
    dispatch(getItemsAction());
  },
});

const withSaga = injectSaga({ key: 'catalog', saga });
const withReducer = injectReducer({ key: 'catalog', reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withSaga,
  withReducer,
)(CatalogScreen);
