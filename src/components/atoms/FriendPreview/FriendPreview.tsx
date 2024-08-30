import { Text, View } from 'tamagui';
import CustomAvatar from '../CustomAvatar/CustomAvatar';
import { formatTimeForPreview } from '~/utils';
import UnreadBadge from '../UnreadBadge/UnreadBadge';
import LastMessageStatus from '../LastMessageStatus/LastMessageStatus';
import styles from '~/styles';

type Props = {
  image: string;
  online: boolean;
  name: string;
  description: string;
  seenStatus: 'received' | 'sending' | 'failed' | '';
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
      width={'100%'}
      minHeight={10}
      flexDirection="row"
      justifyContent="space-between"
      backgroundColor={'white'}
      style={styles.defaultY}
    >
      <CustomAvatar
        size={60}
        name={name}
        source={image}
        online={online}
        isHiddenIfIsActive
      />
      <View
        flex={1}
        paddingHorizontal="$4"
        paddingVertical="$2"
        justifyContent="space-between"
      >
        <Text
          fontWeight={'$7'}
          fontSize={'$5'}
          fontFamily={'$heading'}
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text fontWeight={'$3'} color={'$gray10'} fontSize={'$3'}>
          {description}
        </Text>
      </View>
      <View
        paddingVertical="$2"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Text fontSize={'$4'} fontWeight={'$3'} color={'$gray10'}>
          {formattedTime}
        </Text>
        {unReadCount > 0 ? (
          <UnreadBadge count={unReadCount} size={20} />
        ) : (
          <LastMessageStatus status={seenStatus} size={15} />
        )}
      </View>
    </View>
  );
}
