/*
 * Author: ShinHyunJong
 * Application Name : Wave
 * Corpyright : Ganada Project
 */
import React, { Component } from 'react';

// prop-types
import PropTypes from 'prop-types';

// react-native
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

// react-native-navigation
import { Navigation } from 'react-native-navigation';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// reselect -> reducer에 있는 프로퍼티들 선택 툴
import { createStructuredSelector } from 'reselect';

// injectSaga
import injectSaga from '../../utils/injectSaga';

import { makeSelectUser } from './selectors';

// local action
import { fetchUserAction, trySignOutAction } from './actions';

// local saga
import saga from './saga';

import { startTabScreens } from '../../index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class App extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: false,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    const { fetchUser, componentId } = this.props;
    fetchUser({ componentId });
  }

  navigateToHome = () => {
    const { componentId, onPressSignOut } = this.props;
    onPressSignOut({ componentId });
    // trySignOutAction({ componentId });
    // startTabScreens();
  };

  navigateToSignIn = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.signIn',
        options: {
          topBar: {
            title: {
              text: '로그인',
            },
          },
        },
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.navigateToHome}>
          <Text style={styles.welcome}>Welcome to Wave</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

App.propTypes = {
  componentId: PropTypes.string,
  fetchUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: ({ componentId }) => {
    dispatch(fetchUserAction({ componentId }));
  },
  onPressSignOut: ({ componentId }) => {
    dispatch(trySignOutAction({ componentId }));
  },
});

const withSaga = injectSaga({ key: 'app', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withSaga,
)(App);
