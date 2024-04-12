import { Avatar, ChannelProps } from 'stream-chat-expo';
import { Image, View } from 'tamagui';
import ActiveBadge from '../ActiveBadge/ActiveBadge';

const CustomAvatar = ({
  source,
  name,
  online,
}: {
  name: string;
  source: string;
  online: boolean;
}) => {
  return (
    <View height={40} width={40}>
      <Avatar
        image={source ?? 'https://picsum.photos/300'}
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
        size={40}
        containerStyle={{ borderRadius: 12, backgroundColor: 'red' }}
      />
      <ActiveBadge isActive={online} />
    </View>
  );
};

export default CustomAvatar;
