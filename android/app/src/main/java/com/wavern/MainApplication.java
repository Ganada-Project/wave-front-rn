package com.wavern;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.sensors.RNSensorsPackage;

import com.dylanvann.fastimage.FastImageViewPackage;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    @Override
    protected ReactGateway createReactGateway(){
      ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()){
        @Override
        protected String getJSMainModuleName(){
          return "index";
        }
      };
      return new ReactGateway(this, isDebug(), host);

    }

    @Override
    public boolean isDebug(){
      return BuildConfig.DEBUG;
    }


    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new GeolocationPackage(),
            new RNFirebasePackage(),
            new AsyncStoragePackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
            new RNSensorsPackage(),
            new RNFetchBlobPackage(),
            new FastImageViewPackage(),
            new RNCameraPackage()
      );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages(){
      return getPackages();
    }

}
