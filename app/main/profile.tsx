import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Sheet, Text, View } from 'tamagui';
import constants from '~/assets/constants';
import { Button, Icon, Touchable } from '~/components';
import { TextInput } from '~/components/Inputs';
import { useConnectUser, useGetNameForUser, useSignOut } from '~/hooks';
import { client, storage, usersCollection } from '~/services';
import { useUserStore } from '~/store';
import styles from '~/styles';
import { UserMetadataProps } from '~/types';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function Profile() {
  const [isLoading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleCamera, setVisibleCamera] = useState(false);
  const [changedName, setChangedName] = useState('');
  const { getNameByString } = useGetNameForUser();
  console.log(client.user);
  const profileAvatar = (client.user?.image as string) ?? '';
  const userMetadata = useUserStore((state) => state.userMetadata);
  const name = userMetadata?.name ?? '';
  const email = userMetadata?.email ?? '';
  const setUserMetadata = useUserStore((state) => state.setUserMetadata);
  const uid = useUserStore((state) => state.user?.uid ?? '');
  const { mutation: connect, disconnect } = useConnectUser();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const { mutation: signOut } = useSignOut();
  const openChangeNameSheet = () => {
    setVisible(true);
    setChangedName(name);
  };

  const openCameraSheet = () => {
    setVisibleCamera(true);
  };

  async function handleConnectWithImage(url: string) {
    await connect(
      {
        id: uid,
        name: email ?? '',
        image: url,
      },
      ''
    );
  }

  const handleSignOut = async () => {
    await signOut();
    await disconnect();
  };

  const openCamera = async () => {
    try {
      const isGranted = status?.granted;
      if (isGranted) {
        await requestPermission();
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      const uri = result.assets?.[0].uri;
      if (!uri) return;

      const data = await fetch(uri.replace('file:///', 'file:/'));
      console.log(data);

      const blob = await data.blob();

      const time = new Date().getTime();
      const imageName = `images/${time.toString()}.jpg`;
      console.log('???', imageName);
      const refImage = ref(storage, imageName);
      await uploadBytes(refImage, blob);

      const url = await getDownloadURL(refImage);

      await disconnect();
      await handleConnectWithImage(url);

      setVisibleCamera(false);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  const openGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      const uri = result.assets?.[0].uri;
      if (!uri) return;

      const data = await fetch(uri.replace('file:///', 'file:/'));
      console.log(data);

      const blob = await data.blob();

      const time = new Date().getTime();
      const name = `images/${time.toString()}.jpg`;
      console.log('???', name);
      const refImage = ref(storage, name);
      await uploadBytes(refImage, blob);

      const url = await getDownloadURL(refImage);

      await disconnect();
      await handleConnectWithImage(url);

      setVisibleCamera(false);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  const handleChangeName = async () => {
    setLoading(true);
    try {
      if (changedName !== '') {
        const param: Partial<UserMetadataProps> = {
          ...userMetadata,
          name: changedName,
        };
        setUserMetadata(param as UserMetadataProps);
        await updateDoc(doc(usersCollection, uid), param);
        setVisible(false);
      } else {
        throw Error('Name cannot be empty');
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <View backgroundColor={'$white1'} flex={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <View flex={1} paddingVertical="$10" gap={20}>
          <View gap={'$5'} justifyContent="center" alignItems="center">
            <View style={styles.shadow}>
              <Image
                src={profileAvatar}
                borderRadius={1000}
                width={100}
                height={100}
                backgroundColor={'$white5'}
              />
              <View position="absolute" bottom={0} right={0}>
                <Touchable onPress={openCameraSheet}>
                  <View
                    backgroundColor={'$white1'}
                    borderRadius={1000}
                    padding={'$2'}
                  >
                    <Icon variant="edit" size={15} color="$black1" />
                  </View>
                </Touchable>
              </View>
            </View>
            <Touchable onPress={openChangeNameSheet}>
              <View flexDirection="row" gap={'$5'} alignItems="center">
                <Text
                  textAlign="center"
                  fontSize={'$5'}
                  fontWeight={'$7'}
                  fontFamily={'$heading'}
                >
                  {name}
                </Text>
                <Icon variant="edit" size={15} color="$000000" />
              </View>
            </Touchable>
          </View>
          <View flex={2}>
            <Touchable onPress={handleSignOut}>
              <View
                style={[styles.defaultX]}
                backgroundColor={'$white4'}
                paddingVertical="$5"
                flexDirection="row"
                gap="$2"
                alignItems="center"
              >
                <Icon variant="logOut" size={25} color={'$black'} />
                <Text
                  color={'$black'}
                  fontSize={'$5'}
                  fontWeight={'$7'}
                  fontFamily={'$body'}
                >
                  Log Out
                </Text>
              </View>
            </Touchable>
          </View>
        </View>
      </SafeAreaView>
      <Sheet
        open={visible}
        onOpenChange={setVisible}
        snapPoints={[constants.fullWidth * 0.7]}
        snapPointsMode="constant"
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Frame>
          <View
            flex={1}
            style={[styles.defaultX, styles.defaultY]}
            justifyContent="space-between"
          >
            <Text
              padding={'$5'}
              textAlign="center"
              fontSize={'$7'}
              fontWeight={'$7'}
              fontFamily={'$body'}
            >
              Change your name
            </Text>
            <TextInput
              placeholder="Name"
              value={changedName}
              onChangeText={setChangedName}
            />
            <Button
              isLoading={isLoading}
              onPress={handleChangeName}
              marginTop="$4"
              backgroundColor="$purple4Dark"
              color="$white1"
              fontWeight="$7"
            >
              Save
            </Button>
          </View>
        </Sheet.Frame>
      </Sheet>
      <Sheet
        open={visibleCamera}
        onOpenChange={setVisibleCamera}
        snapPoints={[constants.fullWidth * 0.7]}
        snapPointsMode="constant"
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Frame>
          <View flex={1} style={[styles.defaultX, styles.defaultY]} gap={'$5'}>
            <Text
              padding={'$5'}
              textAlign="center"
              fontSize={'$7'}
              fontWeight={'$7'}
              fontFamily={'$body'}
            >
              Change your avatar
            </Text>

            <View>
              <Button
                onPress={openCamera}
                marginTop="$2"
                backgroundColor="$purple4Dark"
                color="$white1"
                fontWeight="$7"
              >
                Take a picture
              </Button>
              <Button
                onPress={openGallery}
                marginTop="$2"
                backgroundColor="$gray6"
                color="$black1"
                fontWeight="$7"
              >
                Choose from gallery
              </Button>
            </View>
          </View>
        </Sheet.Frame>
      </Sheet>
    </View>
  );
}
