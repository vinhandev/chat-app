import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
} from 'stream-chat-expo';
import { useConnectUser, useCreateChannel } from '~/hooks';

export function Home() {
  const { mutation: connectUser, disconnect } = useConnectUser();
  const { mutation: joinChannel } = useCreateChannel();

  const [isReady, setReady] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<any>(null);

  useEffect(() => {
    const connect = async () => {
      console.log('Connecting...');

      await connectUser(
        { id: '1', name: 'John', image: 'https://i.pravatar.cc/300' },
        'token'
      );

      console.log('User connected !');

      const channel = await joinChannel({
        type: 'messaging',
        id: '123',
        metadata: {
          name: 'My channel',
        },
      });

      await channel.watch();

      setReady(true);
    };
    connect();
    return () => {
      disconnect();
    };
  }, []);

  if (!isReady) {
    return null;
  }

  const handleChannelPress = (channel: any) => {
    setSelectedChannel(channel);
  };

  const handleGoBack = () => {
    setSelectedChannel(null);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!selectedChannel ? (
        <View style={{ flex: 1 }}>
          <ChannelList onSelect={handleChannelPress} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Channel channel={selectedChannel}>
            <TouchableOpacity onPress={handleGoBack}>
              <Text>Go back</Text>
            </TouchableOpacity>
            <MessageList />
            <MessageInput />
          </Channel>
        </View>
      )}
    </SafeAreaView>
  );
}
