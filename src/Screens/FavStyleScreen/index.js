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

// immutability-helper
import update from 'immutability-helper';

// react-native
import {} from 'react-native';

// @shoutem-ui
import {
  View, Text, GridRow, ListView,
} from '@shoutem/ui';

// react-native-navigation
import { Navigation } from 'react-native-navigation';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// reselect -> reducer에 있는 프로퍼티들 선택 툴
import { createStructuredSelector } from 'reselect';

// injectSaga
import injectSaga from '../../../utils/injectSaga';

// local selectors
import { makeSelectStyles, makeSelectStylesLoading } from './selectors';

// local components;
import { FullWidthButton, StyleBox } from '../../Components';

// local action
import { getAllStylesAction } from './actions';

// local saga
import saga from './saga';

// local styles
import styles from './style';

class FavStyleScreen extends Component {
  static options(passProps) {
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
      (style) => style.get('selected') === true
    );
    const stylesArray = [];
    filteredArray.map((style) => stylesArray.push(style.get('id')));
    return stylesArray;
  };

  navigateToFinalRegister = () => {
    const {
      componentId, phone, gender, nickname, name, password,
    } = this.props;
    const stylesArray = this.filterStyleList();
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
    const { stylesList } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header__title}>선호하는 스타일은?</Text>
          <Text style={styles.body__text}>
            이후 프로필 설정에서 변경할 수 있습니다.
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.body__stylesWrapper}>
            {stylesList.map((style, index) => (
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
        </View>
        <View style={styles.footer}>
          <FullWidthButton
            onPress={this.navigateToFinalRegister}
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
  stylesList: PropTypes.instanceOf(List),
  phone: PropTypes.string,
  gender: PropTypes.string,
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withConnect,
  withSaga
)(FavStyleScreen);
