import { memo } from 'react';
import { ChannelList, ChannelProps } from 'stream-chat-expo';
import { View } from 'tamagui';
import FriendPreview from '~/components/FriendPreview/FriendPreview';
import { LoadingListSpinner } from '~/components/Spinners';
import { Touchable } from '~/components/Touchable/Touchable';
import {
  useGetChannelInformation,
  useGetNameForUser,
  useGetOnlineStatusForUser,
} from '~/hooks';
import styles from '~/styles';

type Props = {
  uid: string;
  email: string;
  onSelectChannel: (channel: any) => void;
};
const Component = ({ uid, email, onSelectChannel }: Props) => {
  const getChannelInformation = useGetChannelInformation();

  if (uid === '') return null;
  return (
    <ChannelList
      filters={{ members: { $in: [uid ?? ''] } }}
      additionalFlatListProps={{
        scrollEnabled: false,
      }}
      LoadingIndicator={LoadingListSpinner}
      Preview={({ channel }) => {
        const {
          channelUid,
          description,
          name,
          online,
          status,
          time,
          unReadCount,
          image,
        } = getChannelInformation({ channel, email, uid });

        console.log('image', image);

        const handleSelectChannel = () => {
          if (onSelectChannel !== undefined) {
            onSelectChannel(channel);
          }
        };

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
  );
};

export const AllMessageList = memo(Component);
