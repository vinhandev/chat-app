import { View } from 'tamagui';

type Props = {
  isActive: boolean;
  size?: number;
};
export default function ActiveBadge({ isActive, size = 15 }: Props) {
  return (
    <View
      backgroundColor={isActive ? 'green' : 'gray'}
      borderRadius={1000}
      width={size}
      height={size}
      style={{
        position: 'absolute',
        top: -3,
        right: -3,
        borderWidth: Math.round(size / 5),
        borderColor: 'white',
      }}
    />
  );
}
