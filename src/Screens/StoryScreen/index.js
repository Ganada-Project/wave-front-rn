/**
 * Author: ShinHyunJong
 * Redux & Saga connected index.js
 * Copyright: Ganada Project
 */
import React, { Component } from 'react';

// prop-types
import PropTypes from 'prop-types';

// react-native
import { View, Text } from 'react-native';

// react-native-navigation
import { Navigation } from 'react-native-navigation';

import { FullWidthButton } from '../../Components';

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
import { makeSelectStyles } from './selectors';

// local action
import { getStylesAction} from './actions';

// local saga
import saga from './saga';

// local reducer
import reducer from './reducer';

// local styles
import { SampleText } from './style';

class StoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changed : false
    };
    Navigation.events().bindComponent(this);
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

  test = () => {
    console.log("test!");
    const { getStyles } = this.props;
    getStyles();
    // this.setState({ changed : true});
  }

  render() {
    const { styles } = this.props;
    return <View>
      <SampleText changed={this.state.changed}>권준형</SampleText>      
      <FullWidthButton content="안녕" onPress={this.test} invert/>
      {styles.map(style => { return (
        <Text key={style.id}>{style.name}</Text>
      )})}
    </View>;
  }
}

StoryScreen.propTypes = {
  componentId: PropTypes.string,
  getStyles: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  styles: makeSelectStyles()
});

const mapDispatchToProps = (dispatch) => ({
  getStyles : () => dispatch(getStylesAction())
});

const withSaga = injectSaga({ key: 'story', saga });
const withReducer = injectReducer({ key: 'story', reducer });


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withSaga,
  withReducer,
)(StoryScreen);
