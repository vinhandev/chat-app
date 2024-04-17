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
import {
  useGetNameForUser,
  useGetOnlineStatusForUser,
  useGetUid,
} from '~/hooks';
import { usersCollection } from '~/services';
import { doc, updateDoc } from 'firebase/firestore';
import { UserMetadataProps } from '~/types';
import { Alert } from 'react-native';
import { useState } from 'react';

export default function Channel() {
  const uid = useUserStore((state) => state.user?.uid ?? '');
  const userMetadata = useUserStore((state) => state.userMetadata);
  const setMetadata = useUserStore((state) => state.setUserMetadata);
  const pinned = useUserStore((state) => state.userMetadata?.pinned ?? []);
  const { top, bottom } = useSafeAreaInsets();
  const channel = useUserStore((state) => state.channel) as any;
  const { getName } = useGetNameForUser();
  const { getOnline } = useGetOnlineStatusForUser();
  const { getUid } = useGetUid();
  const [isLoading, setIsLoading] = useState(false);

  if (channel === null) {
    return null;
  }

  const name = getName({ channel });
  const online = getOnline({ channel, uid });
  const channelUid = getUid({ channel, uid });
  const image = channel.state.members[channelUid].user?.image ?? '';
  const isPinned = pinned.includes(channelUid);

  const pinUser = async () => {
    setIsLoading(true);
    let param: Partial<UserMetadataProps>;
    try {
      if (isPinned) {
        param = {
          ...userMetadata,
          pinned: pinned.filter((item) => item !== channelUid),
        };
      } else {
        param = {
          ...userMetadata,
          pinned: [...pinned, channelUid],
        };
      }

      await updateDoc(doc(usersCollection, uid), param);
      setMetadata(param as UserMetadataProps);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
    setIsLoading(false);
  };

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
            <CustomAvatar name={name} online={online} source={image} />
            <View style={{ flexGrow: 1, paddingHorizontal: 10 }}>
              <Text fontWeight={'$7'} fontSize={'$4'} fontFamily={'$body'}>
                {name}
              </Text>
              <Text
                fontSize={'$3'}
                color={online ? '$green10' : '$gray10'}
                fontWeight={'$5'}
              >
                {online ? 'Online' : 'Offline'}
              </Text>
            </View>
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
                isLoading={isLoading}
                variant={isPinned ? 'secondary' : 'primary'}
                icon="pin"
                onPress={pinUser}
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
