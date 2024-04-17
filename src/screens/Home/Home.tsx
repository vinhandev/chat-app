import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  Avatar,
  Channel,
  ChannelList,
  ChannelProps,
  MessageInput,
  MessageList,
  Skeleton,
  useCreateThreadContext,
} from 'stream-chat-expo';
import { Image, ScrollView, Text, View } from 'tamagui';
import FriendPreview from '~/components/FriendPreview/FriendPreview';
import {
  useConnectUser,
  useCreateChannel,
  useGetChannelInformation,
  useGetNameForUser,
  useGetOnlineStatusForUser,
  useGetUid,
  useGetUserList,
  useSignOut,
} from '~/hooks';
import { client } from '~/services';
import { useUserStore } from '~/store';
import { UserProps } from '~/types';
import { LinearGradient } from 'expo-linear-gradient';
import UnreadBadge from '~/components/UnreadBadge/UnreadBadge';
import ActiveBadge from '~/components/ActiveBadge/ActiveBadge';
import {
  Icon,
  IconButton,
  IconVariantProps,
  LastMessageStatus,
  Touchable,
} from '~/components';
import { router } from 'expo-router';
import {
  ChannelGetStreamProps,
  ChannelLastMessageStatusType,
} from '~/types/channels';
import { AllMessageList } from '~/components/List';
import styles from '~/styles';

export const OnlineChannelList = ({
  onChannelSelectChannel,
  email,
  uid,
}: {
  uid: string;
  email: string;
  onChannelSelectChannel: (channel: any) => void;
}) => {
  const getInformation = useGetChannelInformation();
  return (
    <View style={{ paddingLeft: 10 }}>
      <ChannelList
        filters={{ members: { $in: [uid ?? ''] } }}
        options={{
          presence: true,
        }}
        HeaderNetworkDownIndicator={() => null}
        additionalFlatListProps={{
          refreshing: undefined,
          onRefresh: undefined,
          refreshControl: undefined,
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          style: { marginRight: 10 },
          contentContainerStyle: {
            paddingLeft: 10,
          },
          snapToInterval: 75,
          decelerationRate: 'fast',
          snapToAlignment: 'start',
        }}
        EmptyStateIndicator={() => null}
        LoadingIndicator={() => (
          <View padding={'$4'}>
            <ActivityIndicator size={'small'} />
          </View>
        )}
        Preview={({ channel }) => {
          const {
            channelUid,
            description,
            image,
            name,
            online,
            status,
            time,
            unReadCount,
          } = getInformation({ channel, email, uid });

          if (!online) return null;

          return (
            <View
              style={{
                paddingTop: 5,
                paddingRight: 15,
              }}
            >
              <TouchableOpacity onPress={() => onChannelSelectChannel(channel)}>
                <View
                  backgroundColor={'$white5'}
                  style={{
                    borderRadius: 12,
                    width: 60,
                    padding: 5,
                    overflow: 'hidden',
                    gap: 5,
                  }}
                >
                  <Avatar
                    image={image}
                    containerStyle={{
                      borderRadius: 12,
                      padding: 0,
                      margin: 0,
                      width: 50,
                      height: undefined,
                      aspectRatio: 1,
                    }}
                    size={100}
                    ImageComponent={(props) => (
                      <View
                        style={{
                          width: '100%',
                          height: '100%',
                          background: 'red',
                          overflow: 'hidden',
                          borderRadius: 12,
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        <Image
                          style={{
                            width: 50,
                            height: undefined,
                            aspectRatio: 1,
                            borderRadius: 12,
                          }}
                          source={props.source}
                        />
                      </View>
                    )}
                    name={name}
                  />
                  <Text
                    textAlign="center"
                    fontWeight={'$7'}
                    fontSize={'$3'}
                    color={'$black1'}
                    textTransform="capitalize"
                  >
                    {name.slice(0, 5)}
                  </Text>
                </View>
                {online && <ActiveBadge isActive={online} size={15} />}
              </TouchableOpacity>
            </View>
          );
        }}
        onSelect={(channel) => onChannelSelectChannel(channel)}
      />
    </View>
  );
};
export const PinnedChannelList = ({
  onChannelSelectChannel,
  email,
  uid,
}: {
  uid: string;
  email: string;
  onChannelSelectChannel: (channel: any) => void;
}) => {
  const getInformation = useGetChannelInformation();

  const pinned = useUserStore((state) => state.userMetadata?.pinned ?? []);

  return (
    <View style={{ paddingLeft: 10 }}>
      <ChannelList
        filters={{ members: { $in: [uid] } }}
        additionalFlatListProps={{
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          onRefresh: undefined,
          refreshing: undefined,
          ItemSeparatorComponent: () => <View style={{ width: 10 }} />,
          style: { marginRight: 10 },
          contentContainerStyle: {
            paddingLeft: 10,
          },
          refreshControl: undefined,
          snapToInterval: Dimensions.get('window').width * 0.5 - 9,
          snapToAlignment: 'start',
          decelerationRate: 'fast',
        }}
        EmptyStateIndicator={() => null}
        LoadingIndicator={() => (
          <View padding={'$4'}>
            <ActivityIndicator size={'small'} />
          </View>
        )}
        Preview={({ channel }: ChannelProps) => {
          const {
            channelUid,
            description,
            image,
            name,
            online,
            status,
            time,
            unReadCount,
          } = getInformation({ channel, uid, email });
          console.log('channelUid', channelUid, pinned);
          if (!pinned.includes(channelUid)) return null;
          return (
            <TouchableOpacity
              onPress={() => onChannelSelectChannel(channel)}
              style={{
                width: Dimensions.get('window').width * 0.5 - 20,
                height: undefined,
                aspectRatio: 2 / 3,
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <Avatar
                containerStyle={{
                  borderRadius: 12,
                  padding: 0,
                  margin: 0,
                  width: Dimensions.get('window').width * 0.5 - 20,
                  height: undefined,
                  aspectRatio: 2 / 3,
                }}
                size={100}
                ImageComponent={(props) => (
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'red',
                      overflow: 'hidden',
                      borderRadius: 12,
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <Image
                      style={{
                        width: Dimensions.get('window').width * 0.5 - 20,
                        height: undefined,
                        aspectRatio: 2 / 3,
                        borderRadius: 12,
                      }}
                      source={props.source}
                    />
                  </View>
                )}
                image={image}
                name={name}
              />
              <LinearGradient
                style={{
                  flex: 1,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 2,
                }}
                colors={['transparent', '#000000']}
              />

              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 10,
                  justifyContent: 'space-between',
                  padding: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {unReadCount > 0 ? (
                    <UnreadBadge count={unReadCount} size={30} fontSize={4} />
                  ) : (
                    <LastMessageStatus size={25} status={status} />
                  )}
                  <ActiveBadge isActive={online} size={20} />
                </View>
                <View>
                  <Text
                    numberOfLines={1}
                    fontFamily={'$body'}
                    color={'white'}
                    fontWeight={'$7'}
                    fontSize={'$4'}
                  >
                    {name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    fontFamily={'$body'}
                    color={'white'}
                    fontSize={'$4'}
                    fontWeight={'$3'}
                  >
                    {description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        onSelect={(channel) => onChannelSelectChannel(channel)}
      />
    </View>
  );
};

export const Search = () => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <Touchable>
        <View
          backgroundColor={'$white5'}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 15,
            paddingHorizontal: 25,
            paddingVertical: 15,
          }}
        >
          <Text
            fontSize={'$4'}
            fontWeight={'$6'}
            fontFamily={'$body'}
            color={'$gray10'}
          >
            Search or start a message
          </Text>
          <Icon variant="search" color={'$gray10'} />
        </View>
      </Touchable>
    </View>
  );
};

export const Title = ({
  title,
  icon,
}: {
  title: string;
  icon: IconVariantProps;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
    >
      <Icon variant={icon} />
      <Text fontSize={18} fontWeight={'$7'} fontFamily={'$heading'}>
        {title}
      </Text>
    </View>
  );
};

export function Home() {
  const { mutation: signOut } = useSignOut();
  const { mutation: getUsers } = useGetUserList();
  const { mutation: createChannel } = useCreateChannel();
  const { top } = useSafeAreaInsets();

  const user = useUserStore((state) => state.user);
  const email = user?.email ?? '';
  const uid = user?.uid ?? '';

  const pinned = useUserStore((state) => state.userMetadata?.pinned ?? []);
  const setChannel = useUserStore((state) => state.setChannel);

  const handleUpdateChannel = useCallback((channel: ChannelGetStreamProps) => {
    console.log('channelUid outside');
    setChannel(channel);
    router.push('/channel');
  }, []);

  const handleRedirectProfile = () => {
    router.push('/main/profile');
  };

  useEffect(() => {
    const connect = async () => {
      if (user) {
        const data = await getUsers();
        if (data) {
          for (const item of data) {
            if (item.id === user.uid) {
            } else {
              const channel = await createChannel({
                type: 'messaging',
                metadata: {
                  name: `${item.name}${user.email}`,
                  members: [item.id, user.uid],
                },
              });
              await channel.watch();
            }
          }
        }
      }
    };
    connect();
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  const handleGoBack = () => {
    setChannel(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View paddingTop={top}>
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            style={[styles.defaultY, styles.defaultX]}
          >
            <Text fontSize={30} fontWeight={'$7'} fontFamily={'$heading'}>
              Message
            </Text>
            <View flexDirection="row" gap={10}>
              <IconButton
                variant="secondary"
                icon="setting"
                onPress={handleRedirectProfile}
              />
              <IconButton icon="logOut" onPress={handleSignOut} />
            </View>
          </View>
          <View>
            <View style={styles.defaultY}>
              <OnlineChannelList
                onChannelSelectChannel={handleUpdateChannel}
                email={user?.email ?? ''}
                uid={user?.uid ?? ''}
              />
            </View>
          </View>
          <View style={styles.defaultY}>
            <Search />
          </View>
          {pinned.length > 0 && (
            <View>
              <Title title={'Pinned Chats'} icon="pin" />
              <View paddingVertical={10}>
                <PinnedChannelList
                  onChannelSelectChannel={handleUpdateChannel}
                  email={user?.email ?? ''}
                  uid={user?.uid ?? ''}
                />
              </View>
            </View>
          )}
          <View>
            <Title title={'All Chats'} icon="message-circle" />
            <View backgroundColor="$white1" style={styles.defaultX}>
              <AllMessageList
                email={email}
                uid={uid}
                onSelectChannel={handleUpdateChannel}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
