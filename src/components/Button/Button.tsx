import { ButtonProps, Button as TamaguiButton } from 'tamagui';

export default function Button(props: ButtonProps) {
  return <TamaguiButton height={60} {...props} />;
}
