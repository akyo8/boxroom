package com.boxroom;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativepayments.ReactNativePaymentsPackage;
import com.cinder92.musicfiles.RNReactNativeGetMusicFilesPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.devstepbcn.wifi.AndroidWifiPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.rnfs.RNFSPackage;
import io.wifi.p2p.WiFiP2PManagerPackage;
import com.zmxv.RNSound.RNSoundPackage;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;
import com.mybigday.rnmediameta.RNMediaMetaPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativePaymentsPackage(),
          new RNReactNativeGetMusicFilesPackage(),
          new RNDeviceInfo(),
          new AndroidWifiPackage(),
          new ReactVideoPackage(),
          new VectorIconsPackage(),
          new RNFSPackage(),
          new CustomDevicePackage(),
          new WiFiP2PManagerPackage(),
          new RNSoundPackage(),
          new RNSharePackage(),
          new RNMediaMetaPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  public String getFileProviderAuthority() {
    return "com.boxroom.provider";
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
