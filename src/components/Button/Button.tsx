import { ButtonProps, Spinner, Button as TamaguiButton, View } from 'tamagui';

type Props = ButtonProps & {
  isLoading?: boolean;
};
export default function Button({ children, isLoading, ...props }: Props) {
  return (
    <TamaguiButton
      height={60}
      pressStyle={{ opacity: 0.8, backgroundColor: props.backgroundColor }}
      {...props}
    >
      {isLoading ? (
        <Spinner size="small" color={props.color as ''} />
      ) : (
        children
      )}
    </TamaguiButton>
  );
}
