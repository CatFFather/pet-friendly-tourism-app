import React, { useEffect, useRef, useState } from "react";
import { BackHandler, View, ToastAndroid } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

let time = 0;

const App = () => {
  const webviewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (canGoBack) {
          webviewRef.current.goBack();
          return true;
        } else if (time === 0) {
          time += 1;
          ToastAndroid.show(
            "'뒤로' 버튼을 한번 더 누르시면 종료됩니다.",
            ToastAndroid.SHORT
          );
          setTimeout(() => (time = 0), 2000);
          return true;
        } else if (time === 2) {
          BackHandler.exitApp();
          return false;
        }
      }
    );
    return () => backHandler.remove();
  }, [canGoBack]);

  return (
    <SafeAreaProvider>
      <AppContent
        webviewRef={webviewRef}
        canGoBack={canGoBack}
        setCanGoBack={setCanGoBack}
      />
    </SafeAreaProvider>
  );
};

const AppContent = ({ webviewRef, canGoBack, setCanGoBack }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "#FFFFFF",
        flex: 1,
      }}
    >
      <WebView
        ref={webviewRef}
        source={{ uri: "https://pet-friendly-tourism.vercel.app" }}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
        mixedContentMode="compatibility"
      />
    </View>
  );
};

export default App;
