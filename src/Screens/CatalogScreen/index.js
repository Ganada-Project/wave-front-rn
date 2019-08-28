import React, { Component } from 'react';

import { List } from 'immutable';

import PropTypes from 'prop-types';

// react-native-navigation
import { Navigation } from 'react-native-navigation';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// reducer
import { createStructuredSelector } from 'reselect';
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
  Wrapper, Header, Body, SearchBar,
} from './styles';
import { makeSelectBrands } from './selectors';
import { ItemFlatList } from '../../Components';

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

  // navigateToItemDetail
  onPressItem = (item) => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.itemDetail',
        passProps: {
          item,
        },
      },
    });
  };

  render() {
    const { brands } = this.props;
    return (
      <Wrapper>
        <Header>
          <SearchBar />
        </Header>
        <Body>
          <ItemFlatList data={brands.toJS()} onPressItem={this.onPressItem} />
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
