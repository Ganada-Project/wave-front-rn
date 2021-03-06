import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import App from './Screens/App';
// Tab Screens
import HomeScreen from './Screens/HomeScreen';

import CatalogScreen from './Screens/CatalogScreen';
import ProfileScreen from './Screens/ProfileScreen';
import StoryScreen from './Screens/StoryScreen';

// Item Related Screens
import ItemDetailScreen from './Screens/ItemDetailScreen';

// Photo Related Screens
import CameraScreen from './Screens/CameraScreen';
import UploadInfoScreen from './Screens/UploadInfoScreen';
import UploadScreen from './Screens/UploadScreen';

// Auth Related Screens
import SignInScreen from './Screens/SignInScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import GenderScreen from './Screens/GenderScreen';
import Info1Screen from './Screens/Info1Screen';
import PhoneVerifyScreen from './Screens/PhoneVerifyScreen';
import PasswordScreen from './Screens/PasswordScreen';
import FavStyleScreen from './Screens/FavStyleScreen';
import BrandRecommendScreen from './Screens/BrandRecommendScreen';

// Size Card Upload Screens
import PoseInfoScreen from './Screens/PoseInfoScreen';
import HeightSlideScreen from './Screens/HeightSlideScreen';
import UpperBodyWidthSlideScreen from './Screens/UpperBodyWidthSlideScreen';
import PartialHeightSlideScreen from './Screens/PartialHeightSlideScreen';
import LowerBodySlideScreen from './Screens/LowerBodySlideScreen';
import ThighSlideScreen from './Screens/ThighSlideScreen';
import BodySizeScreen from './Screens/BodySizeScreen';
import SizeCardInfoScreen from './Screens/SizeCardInfoScreen';
import BodyStyleScreen from './Screens/BodyStyleScreen';
import FinalRegisterScreen from './Screens/FinalRegisterScreen';

// SizeCard List, Detail Screens
import SizeCardListScreen from './Screens/SizeCardListScreen';
import SizeCardDetailScreen from './Screens/SizeCardDetailScreen';

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
    'wave.sizeCardList',
    () => (props) => (
      <Provider store={store}>
        <SizeCardListScreen {...props} />
      </Provider>
    ),
    () => SizeCardListScreen,
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
  Navigation.registerComponent(
    'wave.story',
    () => (props) => (
      <Provider store={store}>
        <StoryScreen {...props} />
      </Provider>
    ),
    () => StoryScreen,
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
        <Info1Screen {...props} />
      </Provider>
    ),
    () => Info1Screen,
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
    'wave.itemDetail',
    () => (props) => (
      <Provider store={store}>
        <ItemDetailScreen {...props} />
      </Provider>
    ),
    () => ItemDetailScreen,
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
    'wave.heightSlide',
    () => (props) => (
      <Provider store={store}>
        <HeightSlideScreen {...props} />
      </Provider>
    ),
    () => HeightSlideScreen,
  );
  Navigation.registerComponent(
    'wave.upperBodyWidthSlide',
    () => (props) => (
      <Provider store={store}>
        <UpperBodyWidthSlideScreen {...props} />
      </Provider>
    ),
    () => UpperBodyWidthSlideScreen,
  );
  Navigation.registerComponent(
    'wave.partialHeightSlide',
    () => (props) => (
      <Provider store={store}>
        <PartialHeightSlideScreen {...props} />
      </Provider>
    ),
    () => PartialHeightSlideScreen,
  );

  Navigation.registerComponent(
    'wave.lowerBodySlide',
    () => (props) => (
      <Provider store={store}>
        <LowerBodySlideScreen {...props} />
      </Provider>
    ),
    () => LowerBodySlideScreen,
  );
  Navigation.registerComponent(
    'wave.thighSlide',
    () => (props) => (
      <Provider store={store}>
        <ThighSlideScreen {...props} />
      </Provider>
    ),
    () => LowerBodySlideScreen,
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
    'wave.bodyStyle',
    () => (props) => (
      <Provider store={store}>
        <BodyStyleScreen {...props} />
      </Provider>
    ),
    () => BodyStyleScreen,
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
  Navigation.registerComponent(
    'wave.sizeCardInfo',
    () => (props) => (
      <Provider store={store}>
        <SizeCardInfoScreen {...props} />
      </Provider>
    ),
    () => SizeCardInfoScreen,
  );
  Navigation.registerComponent(
    'wave.sizeCardDetail',
    () => (props) => (
      <Provider store={store}>
        <SizeCardDetailScreen {...props} />
      </Provider>
    ),
    () => SizeCardDetailScreen,
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
