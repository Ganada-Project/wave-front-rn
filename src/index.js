import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import App from "./Screens/App";
// import HomeScreen from "./Screens/HomeScreen";
// import BrandScreen from "./Screens/BrandScreen";
// import ProfileScreen from "./Screens/ProfileScreen";
// import SignInScreen from "./Screens/SignInScreen";
// import WelcomeScreen from "./Screens/WelcomeScreen";
// import GenderScreen from "./Screens/GenderScreen";
// import RegisterNameScreen from "./Screens/RegisterNameScreen";
// import PhoneVerifyScreen from "./Screens/PhoneVerifyScreen";
// import PasswordScreen from "./Screens/PasswordScreen";
// import FavStyleScreen from "./Screens/FavStyleScreen";
// import PoseInfoScreen from "./Screens/PoseInfoScreen";
// import FinalRegisterScreen from "./Screens/FinalRegisterScreen";

import configureStore from "./configureStore";

const initialState = {};
const store = configureStore(initialState);
const registerScreens = () => {
  Navigation.registerComponentWithRedux("wave.app", () => App, Provider, store);
  // // Tab Screens
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
  // Navigation.registerComponentWithRedux(
  //   "wave.welcome",
  //   () => WelcomeScreen,
  //   Provider,
  //   store
  // );
  // Navigation.registerComponentWithRedux(
  //   "wave.signIn",
  //   () => SignInScreen,
  //   Provider,
  //   store
  // );
  // Navigation.registerComponentWithRedux(
  //   "wave.gender",
  //   () => GenderScreen,
  //   Provider,
  //   store
  // );
  // Navigation.registerComponentWithRedux(
  //   "wave.registerName",
  //   () => RegisterNameScreen,
  //   Provider,
  //   store
  // );
  // Navigation.registerComponentWithRedux(
  //   "wave.phoneVerify",
  //   () => PhoneVerifyScreen,
  //   Provider,
  //   store
  // );
  // Navigation.registerComponentWithRedux(
  //   "wave.password",
  //   () => PasswordScreen,
  //   Provider,
  //   store
  // );
  // Navigation.registerComponentWithRedux(
  //   "wave.favStyle",
  //   () => FavStyleScreen,
  //   Provider,
  //   store
  // );
  // Navigation.registerComponentWithRedux(
  //   "wave.poseInfo",
  //   () => PoseInfoScreen,
  //   Provider,
  //   store
  // );
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
