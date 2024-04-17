import { TouchableOpacity } from 'react-native';
import { Spinner, View } from 'tamagui';
import { Icon, IconVariantProps } from '../Icon/Icon';

type Props = {
  onPress: () => void;
  icon: IconVariantProps;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
};
export default function IconButton({
  icon,
  onPress,
  variant = 'primary',
  isLoading = false,
}: Props) {
  let backgroundColor, color;
  switch (variant) {
    case 'primary':
      backgroundColor = '$gray6';
      color = '$black';
      break;
    case 'secondary':
      backgroundColor = '$blue5Dark';
      color = '$white8';
      break;
    default:
      break;
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        backgroundColor={backgroundColor}
        borderRadius={'$4'}
        style={{
          width: 40,
          height: 40,

          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isLoading ? (
          <Spinner size="small" color={color as ''} />
        ) : (
          <Icon variant={icon} color={color} />
        )}
      </View>
    </TouchableOpacity>
  );
}
