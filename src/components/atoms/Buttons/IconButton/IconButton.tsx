import { ButtonProps, Button as TamaguiButton } from 'tamagui';

export function IconButton(props: ButtonProps) {
  return <TamaguiButton {...props} width={50} height={50} borderRadius='$6' />;
}
