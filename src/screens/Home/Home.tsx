import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useConnectUser } from '~/hooks';

export function Home() {
  const { mutation: connectUser } = useConnectUser();

  useEffect(() => {
    const connect = async () => {
      await connectUser(
        { id: '1', name: 'John', image: 'https://i.pravatar.cc/300' },
        'token'
      );
      console.log('User connected !');
    };
    connect();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Homepage</Text>
    </View>
  );
}
