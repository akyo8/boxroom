package com.boxroom;

import android.content.Context;
import android.net.wifi.WifiConfiguration;
import android.net.wifi.WifiManager;
import android.widget.Toast;

import java.lang.reflect.Method;


public class ApManager {

    //check whether wifi hotspot on or off
    public static boolean isApOn(Context context) {
        WifiManager wifimanager = (WifiManager) context.getSystemService(context.WIFI_SERVICE);
        try {
            Method method = wifimanager.getClass().getDeclaredMethod("isWifiApEnabled");
            method.setAccessible(true);
            return (Boolean) method.invoke(wifimanager);
        }
        catch (Throwable ignored) {}
        return false;
    }

    // toggle wifi hotspot on or off
    public static boolean configApState(Context context) {
        WifiManager wifimanager = (WifiManager) context.getSystemService(context.WIFI_SERVICE);
        WifiConfiguration wificonfiguration = null;
        try {
            // if WiFi is on, turn it off
            if(isApOn(context)) {
                Toast.makeText(context, "WiFi on", Toast.LENGTH_SHORT).show();
                wifimanager.setWifiEnabled(false);
            }
            Method method = wifimanager.getClass().getMethod("setWifiApEnabled", WifiConfiguration.class, boolean.class);
            method.invoke(wifimanager, wificonfiguration, !isApOn(context));
//            method.invoke(wifimanager, wificonfiguration, enable);
            return true;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
