import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Sheet, Text, View } from 'tamagui';
import constants from '~/assets/constants';
import { Button, Icon, Touchable } from '~/components';
import { TextInput } from '~/components/atoms/Inputs';
import { useConnectUser, useGetNameForUser, useSignOut } from '~/hooks';
import { client, storage, usersCollection } from '~/services';
import styles from '~/styles';
import { UserMetadataProps } from '~/types';
import * as ImagePicker from 'expo-image-picker';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectMetadata, selectUser, updateMetadata } from '~/store/reducers';

export default function Profile() {
  const [isLoading, setLoading] = useState<
    'name' | 'camera' | 'library' | false
  >(false);
  const isLoadingName = isLoading === 'name';
  const isLoadingCamera = isLoading === 'camera';
  const isLoadingLibrary = isLoading === 'library';
  const [visible, setVisible] = useState(false);
  const [visibleCamera, setVisibleCamera] = useState(false);
  const [changedName, setChangedName] = useState('');
  const profileAvatar = (client.user?.image as string) ?? '';
  const userMetadata = useAppSelector(selectMetadata);
  const name = userMetadata?.name ?? '';
  const email = userMetadata?.email ?? '';
  const dispatch = useAppDispatch();
  const uid = useAppSelector(selectUser)?.uid;
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
        id: uid ?? '',
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

  const handleUploadImage = async (
    name: string | null | undefined,
    uri: string | undefined
  ) => {
    if (uri && name) {
      const data = await fetch(uri.replace('file:///', 'file:/'));

      const blob = await data.blob();

      const refImage = ref(storage, name);

      await uploadBytesResumable(refImage, blob);

      const url = await getDownloadURL(refImage);

      await disconnect();
      await handleConnectWithImage(url);
    } else {
      Alert.alert('No image selected');
    }
  };

  const handleChangeImageByCamera = async () => {
    setLoading('camera');
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
      const fileName = result.assets?.[0].fileName;
      await handleUploadImage(fileName, uri);

      setVisibleCamera(false);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
    setLoading(false);
  };

  const handleChangeImageByLibrary = async () => {
    setLoading('library');
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      const uri = result.assets?.[0].uri;
      const fileName = result.assets?.[0].uri.split('/').pop();
      await handleUploadImage(fileName, uri);

      setVisibleCamera(false);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
    setLoading(false);
  };

  const handleChangeName = async () => {
    setLoading('name');
    try {
      if (changedName !== '') {
        const param: Partial<UserMetadataProps> = {
          ...userMetadata,
          name: changedName,
        };
        dispatch(updateMetadata(param));
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
              isLoading={isLoadingName}
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
                isLoading={isLoadingCamera}
                onPress={handleChangeImageByCamera}
                marginTop="$2"
                backgroundColor="$purple4Dark"
                color="$white1"
                fontWeight="$7"
              >
                Take a picture
              </Button>
              <Button
                isLoading={isLoadingLibrary}
                onPress={handleChangeImageByLibrary}
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
