import { Input, InputProps } from 'tamagui';

type Props = InputProps;
export const TextInput = (props: Props) => {
  return <Input height={60} {...props} />;
};
