import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import App from './Screens/App';
// import HomeScreen from "./Screens/HomeScreen";
// import BrandScreen from "./Screens/BrandScreen";
// import ProfileScreen from "./Screens/ProfileScreen";
// import SignInScreen from "./Screens/SignInScreen";
import WelcomeScreen from './Screens/WelcomeScreen';
import GenderScreen from './Screens/GenderScreen';
import RegisterNameScreen from './Screens/RegisterNameScreen';
import PhoneVerifyScreen from './Screens/PhoneVerifyScreen';
import PasswordScreen from './Screens/PasswordScreen';
import FavStyleScreen from './Screens/FavStyleScreen';
import PoseInfoScreen from './Screens/PoseInfoScreen';
import CameraScreen from './Screens/CameraScreen';
// import FinalRegisterScreen from "./Screens/FinalRegisterScreen";

import configureStore from './configureStore';

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
  // Navigation.registerComponentWithRedux(
  //   "wave.home",
  //   () => HomeScreen,
  //   Provider,
  //   store
  // );
  // Navigation.registerComponentWithRedux(
  //   "wave.brand",
  //   () => BrandScreen,
  //   Provider,
  //   store
  // );
  // Navigation.registerComponentWithRedux(
  //   "wave.profile",
  //   () => ProfileScreen,
  //   Provider,
  //   store
  // );
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

  // Navigation.registerComponentWithRedux(
  //   "wave.signIn",
  //   () => SignInScreen,
  //   Provider,
  //   store
  // );
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
    'wave.poseInfo',
    () => (props) => (
      <Provider store={store}>
        <PoseInfoScreen {...props} />
      </Provider>
    ),
    () => PoseInfoScreen,
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

  // Navigation.registerComponentWithRedux(
  //   "wave.finalRegister",
  //   () => FinalRegisterScreen,
  //   Provider,
  //   store
  // );
};

// export const startTabScreens = () => {
//   Navigation.setRoot({
//     root: {
//       bottomTabs: {
//         children: [
//           {
//             stack: {
//               children: [
//                 {
//                   component: {
//                     name: "wave.home"
//                   }
//                 }
//               ],
//               options: {
//                 bottomTab: {
//                   text: "홈",
//                   selectedTextColor: "red",
//                   icon: require("./Assets/Icons/TabIcons/tab_1.png"),
//                   testID: "FIRST_TAB_BAR_BUTTON"
//                 }
//               }
//             }
//           },
//           {
//             stack: {
//               children: [
//                 {
//                   component: {
//                     name: "wave.brand",
//                     options: {
//                       bottomTab: {
//                         text: "브랜드",
//                         icon: require("./Assets/Icons/TabIcons/tab_2.png"),
//                         testID: "SECOND_TAB_BAR_BUTTON"
//                       }
//                     }
//                   }
//                 }
//               ]
//             }
//           },
//           {
//             stack: {
//               children: [
//                 {
//                   component: {
//                     name: "wave.profile",
//                     options: {
//                       bottomTab: {
//                         text: "프로필",
//                         icon: require("./Assets/Icons/TabIcons/tab_5.png"),
//                         testID: "THIRD_TAB_BAR_BUTTON"
//                       }
//                     }
//                   }
//                 }
//               ]
//             }
//           }
//         ]
//       }
//     }
//   });
// };

export default registerScreens;
