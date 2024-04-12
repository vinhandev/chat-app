import { TouchableOpacity } from 'react-native';
import { View } from 'tamagui';
import { Icon, IconVariantProps } from '../Icon/Icon';

type Props = {
  onPress: () => void;
  icon: IconVariantProps;
};
export default function IconButton({ icon, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        backgroundColor={'$gray6'}
        borderRadius={'$4'}
        style={{
          width: 40,
          height: 40,

          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon variant={icon} />
      </View>
    </TouchableOpacity>
  );
}
