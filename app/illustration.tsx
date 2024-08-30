import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'tamagui';

import { useSignInGoogle } from '~/hooks';

import { Icon, Image } from '~/components';
import { IconButton } from '~/components/atoms/Buttons';
import { ActivityIndicator } from 'react-native';
import { useAppSelector } from '~/store/hooks';
import { selectInitializing } from '~/store/reducers';

export default function Illustration() {
  const { mutation } = useSignInGoogle();
  const initializing = useAppSelector(selectInitializing);
  const handleRedirectLoginWithPasswordScreen = () => {
    router.push('/login');
  };
  return (
    <View flex={1} alignItems="center" backgroundColor="$purple4Dark" gap="$4">
      <SafeAreaView style={{ flex: 1 }}>
        <View
          flexGrow={1}
          alignItems="center"
          backgroundColor="$purple4Dark"
          gap="$4"
        >
          <View flexGrow={3} justifyContent="center" alignItems="center">
            <Image width={400} height={400} variant="login_illustration" />
          </View>
          <View flexGrow={2} gap="$4" alignItems="center">
            <View gap="$4">
              <Text
                color="$white1"
                fontSize={40}
                textAlign="center"
                fontWeight="$7"
              >
                Chatting,{'\n'} Made Simple.
              </Text>
              <Text
                color="$white05"
                fontSize={15}
                textAlign="center"
                fontWeight="$4"
              >
                Communicate with family and friends {'\n'} quickly and easily
              </Text>
            </View>
            {initializing ? (
              <View padding="$4">
                <ActivityIndicator color={'white'} size={'large'} />
              </View>
            ) : (
              <View flexDirection="row" gap="$2">
                <IconButton onPress={handleRedirectLoginWithPasswordScreen}>
                  <Icon variant="arrow-right" size="$1" />
                </IconButton>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
