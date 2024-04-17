import { useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
export const Font = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('~/assets/fonts/Inter-Black.ttf'),
    'Inter-Bold': require('~/assets/fonts/Inter-Bold.ttf'),
    'Inter-ExtraBold': require('~/assets/fonts/Inter-ExtraBold.ttf'),
    'Inter-ExtraLight': require('~/assets/fonts/Inter-ExtraLight.ttf'),
    'Inter-Light': require('~/assets/fonts/Inter-Light.ttf'),
    'Inter-Medium': require('~/assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('~/assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('~/assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Thin': require('~/assets/fonts/Inter-Thin.ttf'),

    'WorkSans-Black': require('~/assets/fonts/WorkSans-Black.ttf'),
    'WorkSans-Bold': require('~/assets/fonts/WorkSans-Bold.ttf'),
    'WorkSans-ExtraBold': require('~/assets/fonts/WorkSans-ExtraBold.ttf'),
    'WorkSans-ExtraLight': require('~/assets/fonts/WorkSans-ExtraLight.ttf'),
    'WorkSans-Light': require('~/assets/fonts/WorkSans-Light.ttf'),
    'WorkSans-Medium': require('~/assets/fonts/WorkSans-Medium.ttf'),
    'WorkSans-Regular': require('~/assets/fonts/WorkSans-Regular.ttf'),
    'WorkSans-SemiBold': require('~/assets/fonts/WorkSans-SemiBold.ttf'),
    'WorkSans-Thin': require('~/assets/fonts/WorkSans-Thin.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
