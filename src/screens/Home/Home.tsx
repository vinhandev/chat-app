import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Avatar,
  Channel,
  ChannelList,
  ChannelProps,
  MessageInput,
  MessageList,
} from 'stream-chat-expo';
import { Image, ScrollView, Text, View } from 'tamagui';
import FriendPreview from '~/components/FriendPreview/FriendPreview';
import {
  useConnectUser,
  useCreateChannel,
  useGetUserList,
  useSignOut,
} from '~/hooks';
import { client } from '~/services';
import { useUserStore } from '~/store';
import { UserProps } from '~/types';
import { LinearGradient } from 'expo-linear-gradient';
import UnreadBadge from '~/components/UnreadBadge/UnreadBadge';
import ActiveBadge from '~/components/ActiveBadge/ActiveBadge';
import { Icon, IconVariantProps } from '~/components';
import { router } from 'expo-router';
import { ChannelGetStreamProps } from '~/types/channels';

export const UnreadChannelList = ({
  onChannelSelectChannel,
  email,
  uid,
}: {
  uid: string;
  email: string;
  onChannelSelectChannel: (channel: any) => void;
}) => {
  const filterName = ({ channel }: ChannelProps) => {
    return channel?.data?.name?.replace(email, '') || 'IT Support';
  };

  return (
    <View style={{ paddingLeft: 10 }}>
      <ChannelList
        filters={{ members: { $in: [uid ?? ''] } }}
        additionalFlatListProps={{
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          onRefresh: () => {},
          refreshing: false,
          ItemSeparatorComponent: () => <View style={{ width: 10 }} />,
          style: { marginRight: 10 },
          contentContainerStyle: {
            paddingLeft: 10,
          },
        }}
        Preview={({ channel }: ChannelProps) => {
          console.log('channel', channel.data);
          return (
            <View
              style={{
                paddingTop: 5,
                paddingRight: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => onChannelSelectChannel(channel)}
                style={{
                  width: 50,
                  height: undefined,
                  aspectRatio: 1,
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                <Avatar
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
                  image="https://picsum.photos/300"
                  name={filterName({ channel })}
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
                  colors={['transparent', '#000000aa']}
                />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  zIndex: 10,
                  justifyContent: 'space-between',
                  padding: 20,
                }}
              >
                <ActiveBadge isActive={true} size={20} />
              </View>
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
  const filterName = ({ channel }: ChannelProps) => {
    return channel?.data?.name?.replace(email, '') || 'IT Support';
  };

  return (
    <View style={{ paddingLeft: 10 }}>
      <ChannelList
        filters={{ members: { $in: [uid ?? ''] } }}
        additionalFlatListProps={{
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          onRefresh: () => {},
          refreshing: false,
          ItemSeparatorComponent: () => <View style={{ width: 10 }} />,
          style: { marginRight: 10 },
          contentContainerStyle: {
            paddingLeft: 10,
          },
        }}
        Preview={({ channel }: ChannelProps) => {
          console.log('channel', channel.data);
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
                image="https://picsum.photos/300"
                name={filterName({ channel })}
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
                colors={['transparent', '#000000aa']}
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
                  <UnreadBadge count={1} size={30} fontSize={4} />
                  <ActiveBadge isActive={true} size={20} />
                </View>
                <View>
                  <Text
                    numberOfLines={1}
                    fontFamily={'$body'}
                    color={'white'}
                    fontWeight={'$7'}
                    fontSize={'$4'}
                  >
                    {filterName({ channel })}
                  </Text>
                  <Text
                    numberOfLines={1}
                    fontFamily={'$body'}
                    color={'white'}
                    fontSize={'$4'}
                    fontWeight={'$3'}
                  >
                    Hello Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Ea sint saepe, dolorem ducimus cumque cum tenetur
                    vitae illum est optio repudiandae alias magni odit,
                    exercitationem quisquam laudantium nemo veniam deserunt.
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

export const FriendChannelList = ({
  onGoBack,
  onChannelSelectChannel,
  email,
  uid,
}: {
  uid: string;
  email: string;
  onGoBack: () => void;
  onChannelSelectChannel: (channel: any) => void;
}) => {
  const filterName = ({ channel }: ChannelProps) => {
    return channel?.data?.name?.replace(email, '') || 'IT Support';
  };

  return (
    <ChannelList
      channelRenderFilterFn={(channels) =>
        channels.filter((item) => item.data?.type === 'messaging')
      }
      filters={{ members: { $in: [uid ?? ''] } }}
      additionalFlatListProps={{
        scrollEnabled: false,
        contentContainerStyle: {
          paddingHorizontal: 20,
        },
      }}
      LoadingIndicator={() => <ActivityIndicator />}
      Preview={({ channel }: ChannelProps) => (
        <TouchableOpacity onPress={() => onChannelSelectChannel(channel)}>
          <FriendPreview
            image=""
            description="IT Support"
            name={filterName({ channel })}
            online
            seenStatus="send"
            time={new Date().getTime()}
            unReadCount={3}
          />
        </TouchableOpacity>
      )}
      onSelect={(channel) => onChannelSelectChannel(channel)}
    />
  );
};

export const Search = () => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity>
        <View
          backgroundColor={'$gray6'}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <Text fontSize={'$4'} fontWeight={'$3'} fontFamily={'$body'}>
            Search or start a message
          </Text>
          <Icon variant="search" />
        </View>
      </TouchableOpacity>
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
      <Text fontSize={18} fontWeight={'$7'} fontFamily={'$body'}>
        {title}
      </Text>
    </View>
  );
};

export function Home() {
  const { mutation: signOut } = useSignOut();
  const { mutation: getUsers } = useGetUserList();
  const { mutation: createChannel } = useCreateChannel();

  const user = useUserStore((state) => state.user);

  const setChannel = useUserStore((state) => state.setChannel);

  const handleUpdateChannel = (channel: ChannelGetStreamProps) => {
    setChannel(channel);
    router.push('/main/channel');
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
        console.log(data);
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text fontSize={30} fontWeight={'$7'} fontFamily={'$body'}>
            Message
          </Text>
          <TouchableOpacity onPress={handleSignOut}>
            <View
              style={{
                padding: 10,
                width: 40,
                height: undefined,
                aspectRatio: 1,
              }}
              backgroundColor={'$gray6'}
              borderRadius={'$5'}
            >
              <Icon variant="logOut" size={20} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View paddingVertical={10}>
            <UnreadChannelList
              onChannelSelectChannel={handleUpdateChannel}
              email={user?.email ?? ''}
              uid={user?.uid ?? ''}
            />
          </View>
        </View>
        <View>
          <Search />
        </View>
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
        <View>
          <Title title={'All Chats'} icon="message-circle" />
          <View paddingVertical={10}>
            <FriendChannelList
              onGoBack={handleGoBack}
              onChannelSelectChannel={handleUpdateChannel}
              email={user?.email ?? ''}
              uid={user?.uid ?? ''}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
