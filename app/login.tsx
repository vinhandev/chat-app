import { Link, router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'tamagui';
import { Icon, Image } from '~/components';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/Buttons';
import { TextInput } from '~/components/Inputs';
import { useConnectUser, useSignInGoogle, useSignInPassword } from '~/hooks';

export default function Login() {
  const { mutation } = useSignInPassword();
  const { mutation: connectUser } = useConnectUser();

  const [email, setEmail] = useState('vinhan.dev@gmail.com');
  const [password, setPassword] = useState('123456');
  const handleLoginWithPassword = async () => {
    try {
      const response = await mutation(email, password);
      console.log('response', response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const handleRedirectSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <View flex={1} gap="$4" paddingHorizontal="$6" paddingVertical="$4">
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <IconButton variant="outlined" onPress={handleGoBack}>
            <Icon variant="back" />
          </IconButton>
        </View>
        <View
          height={'30%'}
          justifyContent="center"
          alignItems="center"
          gap="$2"
        >
          <Text fontWeight="$7" textAlign="center" fontSize="$7">
            Welcome Back !
          </Text>
          <Text fontWeight="$3" textAlign="center" fontSize="$3">
            Please sign in to your account
          </Text>
        </View>
        <View gap="$3">
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            marginTop="$4"
            onPress={handleLoginWithPassword}
            backgroundColor="$purple4Dark"
            color="$white1"
            fontWeight="$7"
          >
            Sign In
          </Button>
        </View>
        <View paddingTop="$6">
          <Text fontSize="$3" textAlign="center">
            Don't have an account?{' '}
            <Text
              color="$purple4Dark"
              fontWeight="$7"
              onPress={handleRedirectSignUp}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
