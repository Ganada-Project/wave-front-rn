/**
 * Author: ShinHyunJong
 * Redux & Saga connected index.js
 * Copyright: Ganada Project
 */
import React, { Component } from 'react';

// prop-types
import PropTypes from 'prop-types';

// immutable
import { List, is, fromJS } from 'immutable';

// react-native
import { View, Text, ScrollView } from 'react-native';

// react-native-navigation
import { Navigation } from 'react-native-navigation';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// reselect -> reducer에 있는 프로퍼티들 선택 툴
import { createStructuredSelector } from 'reselect';

// injectSaga, Reducer
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

// local selectors
import { makeSelectBrands, makeSelectRecommendLoading } from './selectors';

// local components;
import { FullWidthButton, BrandBox } from '../../Components';

// local action
import { getBrandRecommendAction } from './actions';

// local saga, reducer
import saga from './saga';
import reducer from './reducer';

// local styles
import styles from './style';

class BrandRecommendScreen extends Component {
  static options() {
    return {
      topBar: {
        noBorder: true,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = { brands: fromJS([]) };
    Navigation.events().bindComponent(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.brands.size === 0) {
      return { brands: nextProps.brands };
    }
    if (!is(nextProps.brands, prevState.brands)) {
      return { brands: prevState.brands };
    }
    return null;
  }

  componentDidMount() {
    const { getBrandRecommend, stylesArray } = this.props;
    // getBrandRecommend({ stylesArray });
  }

  filterBrandList = () => {
    const { brands } = this.state;
    const filteredArray = brands.filter(
      (style) => style.get('selected') === true,
    );
    const brandArray = [];
    filteredArray.map((style) => brandArray.push(style.get('id')));
    return brandArray;
  };

  navigateToPoseInfo = () => {
    const {
      componentId,
      phone,
      gender,
      nickname,
      name,
      password,
      stylesArray,
    } = this.props;
    const brandsArray = this.filterBrandList();
    Navigation.push(componentId, {
      component: {
        name: 'wave.poseInfo',
        passProps: {
          phone,
          gender,
          nickname,
          name,
          password,
          stylesArray,
          brandsArray,
        },
      },
    });
  };

  onPressBrandBox = (index) => () => {
    const { brands } = this.state;
    const newBrands = brands.update(index, (brand) => brand.set('selected', !brand.get('selected')));
    this.setState({ brands: newBrands });
  };

  render() {
    const { brands } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header__title}>추천 브랜드</Text>
        </View>
        <ScrollView style={styles.body} showsScrollIndicator={false}>
          <View style={styles.body__stylesWrapper}>
            {brands.map((brand, index) => (
              <BrandBox
                onPress={this.onPressBrandBox(index)}
                key={`brandBox-${brand.get('id')}`}
                brand={brand}
              />
            ))}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <FullWidthButton
            onPress={this.navigateToPoseInfo}
            invert
            content="다음 단계"
          />
        </View>
      </View>
    );
  }
}

BrandRecommendScreen.propTypes = {
  componentId: PropTypes.string,
  getBrandRecommend: PropTypes.func,
  phone: PropTypes.string,
  gender: PropTypes.number,
  name: PropTypes.string,
  nickname: PropTypes.string,
  password: PropTypes.string,
  stylesArray: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  brands: makeSelectBrands(),
  recommendLoading: makeSelectRecommendLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  getBrandRecommend: ({ stylesArray }) => dispatch(getBrandRecommendAction({ stylesArray })),
});

const withSaga = injectSaga({ key: 'brandRecommend', saga });
const withReducer = injectReducer({ key: 'brandRecommend', reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withReducer,
  withSaga,
)(BrandRecommendScreen);
