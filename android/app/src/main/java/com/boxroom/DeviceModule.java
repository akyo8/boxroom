package com.boxroom;

import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.database.Cursor;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.net.wifi.WifiConfiguration;
import android.net.wifi.WifiManager;
import android.provider.MediaStore;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.io.File;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import android.content.pm.PackageInfo;
import android.util.Log;
import android.widget.Toast;

import static android.content.Context.WIFI_SERVICE;

public class DeviceModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public DeviceModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "DeviceManager";
    }

    @ReactMethod
    public void getImages(Promise promise) {
        Uri uri;
        ArrayList<String> listOfAllImages = new ArrayList<String>();
        Cursor cursor;
        int column_index_data;
        String PathOfImage = null;
        uri = android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI;

        String[] projection = { MediaStore.MediaColumns.DATA,
                MediaStore.Images.Media.BUCKET_DISPLAY_NAME };

        cursor = getReactApplicationContext().getContentResolver().query(uri, projection, null,
                null, null);

        column_index_data = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.DATA);
        while (cursor.moveToNext()) {
            PathOfImage = cursor.getString(column_index_data);

            listOfAllImages.add(PathOfImage);
        }

        WritableArray promiseArray= Arguments.createArray();
        for (String url : listOfAllImages) {
            promiseArray.pushString(url);
        }
        promise.resolve(promiseArray);
    }

    @ReactMethod
    public void getAudios(Promise promise) {
        Uri uri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        String[] projection = { MediaStore.Audio.AudioColumns.DATA };
        Cursor c = getReactApplicationContext().getContentResolver().query(uri, projection, null, null, null);

        WritableArray promiseArray= Arguments.createArray();
        if (c != null) {
            while (c.moveToNext()) {
                promiseArray.pushString(c.getString(0));
            }
            c.close();
        }
        promise.resolve(promiseArray);
    }

    @ReactMethod
    public void getVideos(Promise promise) {
        Uri uri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
        String[] projection = { MediaStore.Video.VideoColumns.DATA };
        Cursor c = getReactApplicationContext().getContentResolver().query(uri, projection, null, null, null);

        WritableArray promiseArray= Arguments.createArray();
        if (c != null) {
            while (c.moveToNext()) {
                promiseArray.pushString(c.getString(0));
            }
            c.close();
        }
        promise.resolve(promiseArray);
    }

    @ReactMethod
    public void getDocuments(Promise promise) {
        Uri uri = MediaStore.Files.getContentUri("external");
        String[] projection = { MediaStore.Files.FileColumns.DATA};
        Cursor c = getReactApplicationContext().getContentResolver().query(uri, projection, null, null, null);

        WritableArray promiseArray= Arguments.createArray();
        if (c != null) {
            while (c.moveToNext()) {
                promiseArray.pushString(c.getString(0));
            }
            c.close();
        }
        promise.resolve(promiseArray);
    }

    @ReactMethod
    public void getApps(Promise promise) {
        PackageManager pm = getReactApplicationContext().getPackageManager();
//    List<PackageInfo> packages = pm.getInstalledPackages(0);

        Intent intent = new Intent(Intent.ACTION_MAIN, null);
        intent.addCategory(Intent.CATEGORY_LAUNCHER);
        List<ResolveInfo> apps = pm.queryIntentActivities(intent, PackageManager.GET_META_DATA);
        Log.d(getClass().getName(), "value = " + apps.size());

        WritableArray ret = Arguments.createArray();

//      List<ApplicationInfo> packages = pm.getInstalledApplications(PackageManager.GET_META_DATA);
//      for(ApplicationInfo p:packages){
//          WritableMap map = Arguments.createMap();
//
//          Drawable icon = p.loadIcon(pm);
//          map.putString("icon", Utility.convert(icon));
//          map.putString("name", p.loadLabel(pm).toString());
//          File file = new File(p.sourceDir);
//          map.putInt("size", (int)file.length());
//
//          if( pm.getLaunchIntentForPackage(p.packageName) != null ){
//              String currAppName = pm.getApplicationLabel(p).toString();
//              //This app is a non-system app
//              map.putBoolean("isSystemApp", false);
//          }
//          else{
//              //System App
//              map.putBoolean("isSystemApp", true);
//          }
//          ret.pushMap(map);
//      }

        for (final ResolveInfo r: apps) {
            WritableMap map = Arguments.createMap();

            Drawable icon = r.loadIcon(pm);
            map.putString("icon", Utility.convert(icon));
            map.putString("name", r.loadLabel(pm).toString());

            File file = new File(r.activityInfo.applicationInfo.sourceDir);
            map.putInt("size", (int)file.length());
            map.putBoolean("isSystemApp", (r.activityInfo.applicationInfo.flags & ApplicationInfo.FLAG_SYSTEM) != 0);

            ret.pushMap(map);
        }
        promise.resolve(ret);
    }

    @ReactMethod
    public void enableTether(String ssid) {
        setWifiTetheringEnabled(true, ssid);
    }

    @ReactMethod
    public void disableTether() {
        setWifiTetheringEnabled(false, "");
    }

    private void setWifiTetheringEnabled(boolean enable, String ssid) {
        String flag = WIFI_SERVICE;
        WifiManager wifiManager = (WifiManager) getReactApplicationContext().getSystemService(flag);

        Method[] methods = wifiManager.getClass().getDeclaredMethods();
        for (Method method : methods) {
            if (method.getName().equals("setWifiApEnabled")) {
                try {
                    WifiConfiguration wifiConfiguration = new WifiConfiguration();
                    wifiConfiguration.SSID = ssid;
                    method.invoke(wifiManager, enable ? wifiConfiguration : null, enable);
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
                break;
            }
        }
    }

    @ReactMethod
    public void connectToDevice(String ssid, Promise promise) {
        WifiConfiguration conf = new WifiConfiguration();
        conf.SSID = "\"" + ssid + "\"";
        conf.allowedKeyManagement.set(WifiConfiguration.KeyMgmt.NONE);
        WifiManager wifiManager = (WifiManager)getReactApplicationContext().getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        wifiManager.addNetwork(conf);

        List<WifiConfiguration> list = wifiManager.getConfiguredNetworks();
        for( WifiConfiguration i : list ) {
            if(i.SSID != null && i.SSID.equals("\"" + ssid + "\"")) {
                wifiManager.disconnect();
                wifiManager.enableNetwork(i.networkId, true);
                wifiManager.reconnect();

                promise.resolve(null);

                break;
            }
        }

    }

}
