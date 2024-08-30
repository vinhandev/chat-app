import { Link, router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'tamagui';
import { Icon, Image } from '~/components';
import { Button } from '~/components/atoms/Button';
import { IconButton } from '~/components/atoms/Buttons';
import { TextInput } from '~/components/atoms/Inputs';
import { useSignInGoogle, useSignInPassword, useSignUpPassword } from '~/hooks';

export default function SignUp() {
  const { mutation } = useSignUpPassword();

  const [isLoading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('vinhan.dev@gmail.com');
  const [password, setPassword] = useState('123456');
  const [confirm, setConfirm] = useState('123456');
  const handleRegister = async () => {
    setLoading(true);
    try {
      if (confirm !== password) {
        throw new Error('Passwords do not match');
      } else {
        const response = await mutation(email, password, name);
      }
    } catch (error) {
      console.error(error);
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
            Create new account
          </Text>
          <Text fontWeight="$3" textAlign="center" fontSize="$3">
            Please fill in the form to continue
          </Text>
        </View>
        <View gap="$3">
          <TextInput
            placeholder="Full name"
            value={name}
            onChangeText={setName}
          />
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
          <TextInput
            placeholder="Confirm Password"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
          />
          <Button
            isLoading={isLoading}
            marginTop="$4"
            onPress={handleRegister}
            backgroundColor="$purple4Dark"
            color="$white1"
            fontWeight="$7"
          >
            Sign Up
          </Button>
        </View>
        <View paddingTop="$6">
          <Text fontSize="$3" textAlign="center">
            Already have an account?{' '}
            <Text
              color="$purple4Dark"
              fontWeight="$7"
              onPress={handleRedirectSignUp}
            >
              Login
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
