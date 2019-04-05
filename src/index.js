import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import App from './Screens/App';
// Tab Screens
import HomeScreen from './Screens/HomeScreen';
import CatalogScreen from './Screens/CatalogScreen';
import ProfileScreen from './Screens/ProfileScreen';

// Photo Related Screens
import CameraScreen from './Screens/CameraScreen';
import UploadInfoScreen from './Screens/UploadInfoScreen';
import UploadScreen from './Screens/UploadScreen';

// Auth Related Screens
import SignInScreen from './Screens/SignInScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import GenderScreen from './Screens/GenderScreen';
import RegisterNameScreen from './Screens/RegisterNameScreen';
import PhoneVerifyScreen from './Screens/PhoneVerifyScreen';
import PasswordScreen from './Screens/PasswordScreen';
import FavStyleScreen from './Screens/FavStyleScreen';
import BrandRecommendScreen from './Screens/BrandRecommendScreen';
import PoseInfoScreen from './Screens/PoseInfoScreen';
import ShulderArmSlideScreen from './Screens/ShulderArmSlideScreen';
import BodySizeScreen from './Screens/BodySizeScreen';
import FinalRegisterScreen from './Screens/FinalRegisterScreen';
import configureStore from './configureStore';
import { theme } from './constants';

const registerScreens = () => {
  const store = configureStore({});
  Navigation.registerComponent(
    'wave.app',
    () => (props) => (
      <Provider store={store}>
        <App {...props} />
      </Provider>
    ),
    () => App,
  ); // Tab Screens
  Navigation.registerComponent(
    'wave.home',
    () => (props) => (
      <Provider store={store}>
        <HomeScreen {...props} />
      </Provider>
    ),
    () => HomeScreen,
  );
  Navigation.registerComponent(
    'wave.brand',
    () => (props) => (
      <Provider store={store}>
        <CatalogScreen {...props} />
      </Provider>
    ),
    () => CatalogScreen,
  );
  Navigation.registerComponent(
    'wave.profile',
    () => (props) => (
      <Provider store={store}>
        <ProfileScreen {...props} />
      </Provider>
    ),
    () => ProfileScreen,
  );

  // // Auth Screens
  Navigation.registerComponent(
    'wave.welcome',
    () => (props) => (
      <Provider store={store}>
        <WelcomeScreen {...props} />
      </Provider>
    ),
    () => WelcomeScreen,
  );
  Navigation.registerComponent(
    'wave.signIn',
    () => (props) => (
      <Provider store={store}>
        <SignInScreen {...props} />
      </Provider>
    ),
    () => SignInScreen,
  );
  Navigation.registerComponent(
    'wave.gender',
    () => (props) => (
      <Provider store={store}>
        <GenderScreen {...props} />
      </Provider>
    ),
    () => GenderScreen,
  );
  Navigation.registerComponent(
    'wave.registerName',
    () => (props) => (
      <Provider store={store}>
        <RegisterNameScreen {...props} />
      </Provider>
    ),
    () => RegisterNameScreen,
  );
  Navigation.registerComponent(
    'wave.phoneVerify',
    () => (props) => (
      <Provider store={store}>
        <PhoneVerifyScreen {...props} />
      </Provider>
    ),
    () => PhoneVerifyScreen,
  );
  Navigation.registerComponent(
    'wave.password',
    () => (props) => (
      <Provider store={store}>
        <PasswordScreen {...props} />
      </Provider>
    ),
    () => PasswordScreen,
  );
  Navigation.registerComponent(
    'wave.favStyle',
    () => (props) => (
      <Provider store={store}>
        <FavStyleScreen {...props} />
      </Provider>
    ),
    () => FavStyleScreen,
  );
  Navigation.registerComponent(
    'wave.brandRecommend',
    () => (props) => (
      <Provider store={store}>
        <BrandRecommendScreen {...props} />
      </Provider>
    ),
    () => BrandRecommendScreen,
  );
  Navigation.registerComponent(
    'wave.poseInfo',
    () => (props) => (
      <Provider store={store}>
        <PoseInfoScreen {...props} />
      </Provider>
    ),
    () => PoseInfoScreen,
  );
  Navigation.registerComponent(
    'wave.camera',
    () => (props) => (
      <Provider store={store}>
        <CameraScreen {...props} />
      </Provider>
    ),
    () => CameraScreen,
  );
  Navigation.registerComponent(
    'wave.uploadInfo',
    () => (props) => (
      <Provider store={store}>
        <UploadInfoScreen {...props} />
      </Provider>
    ),
    () => UploadInfoScreen,
  );
  Navigation.registerComponent(
    'wave.upload',
    () => (props) => (
      <Provider store={store}>
        <UploadScreen {...props} />
      </Provider>
    ),
    () => UploadScreen,
  );
  Navigation.registerComponent(
    'wave.shulderArmSlide',
    () => (props) => (
      <Provider store={store}>
        <ShulderArmSlideScreen {...props} />
      </Provider>
    ),
    () => ShulderArmSlideScreen,
  );
  Navigation.registerComponent(
    'wave.bodySize',
    () => (props) => (
      <Provider store={store}>
        <BodySizeScreen {...props} />
      </Provider>
    ),
    () => BodySizeScreen,
  );
  Navigation.registerComponent(
    'wave.finalRegister',
    () => (props) => (
      <Provider store={store}>
        <FinalRegisterScreen {...props} />
      </Provider>
    ),
    () => FinalRegisterScreen,
  );
};

export const startTabScreens = () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'wave.home',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./Assets/Icons/TabIcons/tab_1.png'),
                  text: '',
                  testID: 'FIRST_TAB_BAR_BUTTON',
                  selectedIconColor: theme.pointColor,
                  iconInsets: {
                    top: 0,
                    left: 0,
                    bottom: -12,
                    right: 0,
                  },
                },
                bottomTabs: {
                  titleDisplayMode: 'alwaysHide',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'wave.brand',
                  },
                },
              ],
              options: {
                modalPresentationStyle: 'overCurrentContext',
                bottomTab: {
                  icon: require('./Assets/Icons/TabIcons/tab_2.png'),
                  testID: 'SECOND_TAB_BAR_BUTTON',
                  selectedIconColor: theme.pointColor,
                  iconInsets: {
                    top: 0,
                    left: 0,
                    bottom: -12,
                    right: 0,
                  },
                },
                bottomTabs: {
                  titleDisplayMode: 'alwaysHide',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'wave.uploadInfo',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./Assets/Icons/TabIcons/post.png'),
                  testID: 'THIRD_TAB_BAR_BUTTON',
                  selectedIconColor: theme.pointColor,
                  iconInsets: {
                    top: 0,
                    left: 0,
                    bottom: -12,
                    right: 0,
                  },
                },
                bottomTabs: {
                  titleDisplayMode: 'alwaysHide',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'wave.profile',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./Assets/Icons/TabIcons/tab_5.png'),
                  testID: 'FIFTH_TAB_BAR_BUTTON',
                  selectedIconColor: theme.pointColor,
                  iconInsets: {
                    top: 0,
                    left: 0,
                    bottom: -12,
                    right: 0,
                  },
                },
                bottomTabs: {
                  titleDisplayMode: 'alwaysHide',
                },
              },
            },
          },
        ],
      },
    },
  });
};

export default registerScreens;
