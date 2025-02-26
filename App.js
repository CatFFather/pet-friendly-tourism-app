import React, { useEffect, useRef, useState } from "react";
import { BackHandler, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

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
        } else {
          BackHandler.exitApp();
        }
        return false;
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
