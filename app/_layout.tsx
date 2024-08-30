import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useWatchUser } from '~/hooks';

import { Stream, Tamagui, Font } from '~/providers';
import { store } from '~/store';

function InnerApp() {
  const watchUser = useWatchUser();

  useEffect(() => {
    return watchUser();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Font>
        <Tamagui>
          <Provider store={store}>
            <Stream>
              <SafeAreaProvider style={{ flex: 1 }}>
                <InnerApp />
              </SafeAreaProvider>
            </Stream>
          </Provider>
        </Tamagui>
      </Font>
    </GestureHandlerRootView>
  );
}
