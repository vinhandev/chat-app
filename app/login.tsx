import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'tamagui';
import { Button } from '~/components/atoms/Button';
import { TextInput } from '~/components/atoms/Inputs';
import { useConnectUser, useSignInPassword } from '~/hooks';

const texts = {
  WELCOME_TITLE: 'Welcome Back !',
  WELCOME_DESCRIPTION: 'Please sign in to your account',
  EMAIL_PLACEHOLDER: 'Email',
  PASSWORD_PLACEHOLDER: 'Password',
  SIGN_IN_BUTTON: 'Sign In',
  SIGN_UP_BUTTON: 'Sign Up',
};

export default function Login() {
  const { mutation } = useSignInPassword();

  const [isLoading, setLoading] = useState(false);

  const [email, setEmail] = useState('vinhan.dev@gmail.com');
  const [password, setPassword] = useState('123456');
  const handleLoginWithPassword = async () => {
    setLoading(true);
    try {
      await mutation(email, password);
    } catch (error) {
      console.error('Error', error);
    }
    setLoading(false);
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
      <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
        <View justifyContent="center" alignItems="center" gap="$2" flex={1}>
          <Text fontWeight="$7" textAlign="center" fontSize="$7">
            {texts.WELCOME_TITLE}
          </Text>
          <Text fontWeight="$3" textAlign="center" fontSize="$3">
            {texts.WELCOME_DESCRIPTION}
          </Text>
        </View>
        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}
          behavior="padding"
        >
          <View gap="$3">
            <TextInput
              placeholder={texts.EMAIL_PLACEHOLDER}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder={texts.PASSWORD_PLACEHOLDER}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button
              isLoading={isLoading}
              marginTop="$4"
              onPress={handleLoginWithPassword}
              backgroundColor="$purple4Dark"
              color="$white1"
              fontWeight="$7"
            >
              {texts.SIGN_IN_BUTTON}
            </Button>
          </View>
        </KeyboardAvoidingView>
        <View paddingTop="$6">
          <Text fontSize="$3" textAlign="center">
            Don't have an account?{' '}
            <Text
              color="$purple4Dark"
              fontWeight="$7"
              onPress={handleRedirectSignUp}
            >
              {texts.SIGN_UP_BUTTON}
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
