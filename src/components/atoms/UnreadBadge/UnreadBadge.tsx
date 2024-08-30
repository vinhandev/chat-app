import { Text, View } from 'tamagui';

type Props = {
  count: number;
  size: number;
  fontSize?: number;
};
export default function UnreadBadge({ count, size, fontSize = 3 }: Props) {
  return (
    <View
      backgroundColor={'black'}
      borderRadius={1000}
      width={size}
      height={size}
      justifyContent="center"
      alignItems="center"
    >
      <Text
        fontSize={`$${fontSize}` as '$3'}
        fontWeight={'bold'}
        color={'white'}
      >
        {count}
      </Text>
    </View>
  );
}
