/*
 * Author: ShinHyunJong
 * Application Name : WearBe
 * Corpyright : Ganada Project
 */
/* eslint-disable */
import { YellowBox } from 'react-native';
import { Navigation } from 'react-native-navigation';
import registerScreens from './src';
import { theme } from './src/constants';
if (!global._babelPolyfill) {
  require('babel-polyfill'); // eslint-disable-line global-require
}
YellowBox.ignoreWarnings(['Require cycle:']);
YellowBox.ignoreWarnings(['unknown call: "relay:check"']);
registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      backButton: { color: theme.pointColor },
    },
  });
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'wave.app',
            },
          },
        ],
      },
    },
  });
});
