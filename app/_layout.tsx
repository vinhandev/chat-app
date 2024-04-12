import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useWatchUser } from '~/hooks';

import { Stream, Tamagui, Font } from '~/providers';

export default function App() {
  const { mutation } = useWatchUser();

  useEffect(() => {
    mutation();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Font>
        <Tamagui>
          <Stream>
            <SafeAreaProvider style={{ flex: 1 }}>
              <Stack>
                <Stack.Screen
                  name="illustration"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="sign-up" options={{ headerShown: false }} />
                <Stack.Screen name="main" options={{ headerShown: false }} />
              </Stack>
            </SafeAreaProvider>
          </Stream>
        </Tamagui>
      </Font>
    </GestureHandlerRootView>
  );
}
