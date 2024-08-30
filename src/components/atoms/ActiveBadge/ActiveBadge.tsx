import { View } from 'tamagui';

type Props = {
  isActive: boolean;
  size?: number;
};
export default function ActiveBadge({ isActive, size = 15 }: Props) {
  const position = -size * 0.25;
  const padding = size * 0.2;
  return (
    <View
      borderRadius={1000}
      backgroundColor={'$white1'}
      style={{
        position: 'absolute',
        top: position,
        right: position,
        padding,
      }}
    >
      <View
        borderRadius={1000}
        width={size * 0.8}
        height={size * 0.8}
        backgroundColor={isActive ? 'green' : 'gray'}
      />
    </View>
  );
}
