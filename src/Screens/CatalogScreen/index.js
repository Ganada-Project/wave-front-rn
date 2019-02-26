import React, { Component } from 'react';

import { List } from 'immutable';

import PropTypes from 'prop-types';

import { Button, View, Text } from 'react-native';

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
import { getBrandRecommendAction } from './actions';

import {
  Wrapper,
  Header,
  Body,
  SearchBar,
  BodySubjectText,
  BodyBrandArea,
} from './styles';
import { makeSelectBrands } from './selectors';
import { BrandTile } from '../../Components';

class CatalogScreen extends Component {
  static options(passProps) {
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
    const { getBrandRecommend } = this.props;
    getBrandRecommend();
  }

  render() {
    const { brands } = this.props;
    return (
      <Wrapper>
        <Header>
          <SearchBar />
        </Header>
        <Body>
          <BodySubjectText>회원님을 위한 브랜드</BodySubjectText>
          <BodyBrandArea horizontal showsHorizontalScrollIndicator={false}>
            {brands.map((brand) => (
              <BrandTile key={`catalog-${brand.id}`} brand={brand} />
            ))}
          </BodyBrandArea>
        </Body>
      </Wrapper>
    );
  }
}

CatalogScreen.propTypes = {
  componentId: PropTypes.string,
  getBrandRecommend: PropTypes.func,
  brands: PropTypes.instanceOf(List),
};

const mapStateToProps = createStructuredSelector({
  brands: makeSelectBrands(),
});

const mapDispatchToProps = (dispatch) => ({
  getBrandRecommend: () => {
    dispatch(getBrandRecommendAction());
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
