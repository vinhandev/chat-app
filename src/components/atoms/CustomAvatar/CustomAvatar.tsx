import { Avatar, ChannelProps } from 'stream-chat-expo';
import { Image, View } from 'tamagui';
import ActiveBadge from '../ActiveBadge/ActiveBadge';

type Props = {
  name: string;
  source: string;
  online: boolean;
  isHiddenIfIsActive?: boolean;
  size?: number;
};
const CustomAvatar = ({
  source,
  name,
  online,
  isHiddenIfIsActive = false,
  size = 40,
}: Props) => {
  const borderRadius = size * 0.35;
  const activeSize = size * 0.3;
  return (
    <View height={size} width={size}>
      <Avatar
        image={source}
        ImageComponent={(props) => (
          <Image
            style={{
              width: '100%',
              height: '100%',
            }}
            source={props.source}
          />
        )}
        name={name}
        size={size}
        containerStyle={{ borderRadius, backgroundColor: '#eee' }}
      />
      {isHiddenIfIsActive && !online ? null : (
        <ActiveBadge isActive={online} size={activeSize} />
      )}
    </View>
  );
};

export default CustomAvatar;
