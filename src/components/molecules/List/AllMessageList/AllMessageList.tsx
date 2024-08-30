import { memo } from 'react';
import { ChannelList } from 'stream-chat-expo';
import { View } from 'tamagui';
import {
  FriendPreview,
  LoadingListSpinner,
  Touchable,
} from '~/components/atoms';
import { useGetChannelInformation } from '~/hooks';

type Props = {
  uid: string;
  email: string;
  searchValue: string;
  onSelectChannel: (channel: any) => void;
};
const Component = ({ uid, email, searchValue, onSelectChannel }: Props) => {
  const getChannelInformation = useGetChannelInformation();
  console.log('searchValue', searchValue);

  if (uid === '') return null;
  return (
    <View
      style={{
        background: 'grey',
        flex: 1,
      }}
    >
      <ChannelList
        key={searchValue}
        filters={{ members: { $in: [uid ?? ''] } }}
        additionalFlatListProps={{
          scrollEnabled: false,
        }}
        LoadingIndicator={LoadingListSpinner}
        Preview={({ channel }) => {
          const {
            description,
            name,
            online,
            status,
            time,
            unReadCount,
            image,
          } = getChannelInformation({ channel, email, uid });

          const handleSelectChannel = () => {
            if (onSelectChannel !== undefined) {
              onSelectChannel(channel);
            }
          };

          console.log('?', searchValue);

          if (
            !name
              .trim()
              .toLowerCase()
              .includes(searchValue.trim().toLowerCase())
          ) {
            return null;
          }
          return (
            <Touchable onPress={handleSelectChannel}>
              <FriendPreview
                image={image}
                description={description}
                name={name}
                online={online}
                seenStatus={status}
                time={time}
                unReadCount={unReadCount}
              />
            </Touchable>
          );
        }}
      />
    </View>
  );
};

export const AllMessageList = memo(Component);
