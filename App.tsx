import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Stream, Tamagui } from '~/providers';
import { Home } from '~/screens';

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Tamagui>
          <Stream>
            <Home />
          </Stream>
        </Tamagui>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
