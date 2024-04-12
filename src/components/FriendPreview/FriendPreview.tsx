import { Text, View } from 'tamagui';
import CustomAvatar from '../CustomAvatar/CustomAvatar';
import { formatTimeForPreview } from '~/utils';
import UnreadBadge from '../UnreadBadge/UnreadBadge';

type Props = {
  image: string;
  online: boolean;
  name: string;
  description: string;
  seenStatus: 'send' | 'received' | 'seen';
  unReadCount: number;
  time: number;
};
export default function FriendPreview({
  description,
  image,
  name,
  online,
  seenStatus,
  time,
  unReadCount,
}: Props) {
  const formattedTime = formatTimeForPreview(time);

  return (
    <View
      height={60}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <CustomAvatar name={name} source={image} online={online} />
      <View flexGrow={1} paddingLeft="$5">
        <Text>{name}</Text>
        <Text>{description}</Text>
      </View>
      <View alignItems="flex-end" justifyContent="flex-end">
        <Text fontSize={'$4'} fontWeight={'$3'} color={'$gray10'}>
          {formattedTime}
        </Text>
        {unReadCount > 0 ? (
          <UnreadBadge count={unReadCount} size={25} />
        ) : (
          <Text>{seenStatus}</Text>
        )}
      </View>
    </View>
  );
}
