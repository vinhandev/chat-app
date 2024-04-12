import { Text, View } from 'tamagui';
import { useUserStore } from '~/store';

import {
  MessageInput,
  MessageList,
  Channel as RNChannel,
} from 'stream-chat-expo';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { CustomAvatar, Icon, IconButton } from '~/components';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';

export default function Channel() {
  const { top, bottom } = useSafeAreaInsets();
  const channel = useUserStore((state) => state.channel);

  if (channel === null) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: bottom }}>
      <View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          }}
        >
          <BlurView
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',

              paddingHorizontal: 10,
              paddingTop: top + 20,
              paddingBottom: 20,

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
            intensity={80}
            tint="light"
          >
            <CustomAvatar
              name="A"
              online={false}
              source="https://picsum.photos/300"
            />
            <View flexDirection="row" gap="$3">
              <IconButton
                icon="back"
                onPress={() => {
                  if (router.canGoBack()) {
                    router.back();
                  }
                }}
              />
              <IconButton
                icon="more"
                onPress={() => {
                  if (router.canGoBack()) {
                    router.back();
                  }
                }}
              />
            </View>
          </BlurView>
        </View>
        <View>
          <RNChannel channel={channel as any}>
            <MessageList />
            <MessageInput />
          </RNChannel>
        </View>
      </View>
    </View>
  );
}
