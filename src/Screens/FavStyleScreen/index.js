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
import { makeSelectStyles, makeSelectStylesLoading } from './selectors';

// local components;
import { FullWidthButton, StyleBox, BarLoading } from '../../Components';

// local action
import { getAllStylesAction } from './actions';

// local saga, reducer
import saga from './saga';
import reducer from './reducer';

// local styles
import styles from './style';
import { theme } from '../../constants';

class FavStyleScreen extends Component {
  static options() {
    return {
      topBar: {
        noBorder: true,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = { stylesList: fromJS([]) };
    Navigation.events().bindComponent(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.stylesList.size === 0) {
      return { stylesList: nextProps.stylesList };
    }
    if (!is(nextProps.stylesList, prevState.stylesList)) {
      return { stylesList: prevState.stylesList };
    }
    return null;
  }

  componentDidMount() {
    const { getAllStyles } = this.props;
    getAllStyles();
  }

  filterStyleList = () => {
    const { stylesList } = this.state;
    const filteredArray = stylesList.filter(
      (style) => style.get('selected') === true,
    );
    const stylesArray = [];
    filteredArray.map((style) => stylesArray.push(style.get('id')));
    return stylesArray;
  };

  navigateToPoseInfo = () => {
    const {
      componentId, phone, gender, nickname, name, password,
    } = this.props;
    const stylesArray = this.filterStyleList();
    Navigation.push(componentId, {
      component: {
        name: 'wave.brandRecommend',
        passProps: {
          phone,
          gender,
          nickname,
          name,
          password,
          stylesArray,
        },
      },
    });
  };

  onPressStyleBox = (index) => () => {
    const { stylesList } = this.state;
    // const newStylesList = stylesList.setIn([index, 'selected'], true);
    const newStylesList = stylesList.update(index, (style) => style.set('selected', !style.get('selected')));
    this.setState({ stylesList: newStylesList });
  };

  render() {
    const { stylesLoading } = this.props;
    const { stylesList } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header__title}>선호하는 스타일</Text>
        </View>
        <ScrollView style={styles.body}>
          <View style={styles.body__stylesWrapper}>
            {stylesLoading ? <BarLoading size={25} /> : stylesList.map((style, index) => (
              <StyleBox
                key={`favStyle-${style.get('id')}`}
                name={style.get('name')}
                selected={style.get('selected')}
                index={index}
                divider={3.8}
                onPress={this.onPressStyleBox(index)}
                imgUrl={style.get('image_url')}
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

FavStyleScreen.propTypes = {
  componentId: PropTypes.string,
  getAllStyles: PropTypes.func,
  stylesLoading: PropTypes.bool,
  phone: PropTypes.string,
  gender: PropTypes.number,
  name: PropTypes.string,
  nickname: PropTypes.string,
  password: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  stylesList: makeSelectStyles(),
  stylesLoading: makeSelectStylesLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  getAllStyles: () => dispatch(getAllStylesAction()),
});

const withSaga = injectSaga({ key: 'favStyle', saga });
const withReducer = injectReducer({ key: 'favStyle', reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withReducer,
  withSaga,
)(FavStyleScreen);
