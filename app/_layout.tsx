import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useWatchUser } from '~/hooks';

import { Stream, Tamagui, Font } from '~/providers';

export default function App() {
  const watchUser = useWatchUser();

  useEffect(() => {
    return watchUser();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Font>
        <Tamagui>
          <Stream>
            <SafeAreaProvider style={{ flex: 1 }}>
              <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaProvider>
          </Stream>
        </Tamagui>
      </Font>
    </GestureHandlerRootView>
  );
}
