/*
 * Author: ShinHyunJong
 * Application Name : Wave
 * Corpyright : Ganada Project
 */
// import { YellowBox } from "react-native";
import { Navigation } from "react-native-navigation";
import registerScreens from "./src";
import { theme } from "./src/constants";
// YellowBox.ignoreWarnings(["Require cycle:"]);
registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      backButton: { color: theme.pointColor }
    }
  });
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "wave.app"
            }
          }
        ]
      }
    }
  });
});
