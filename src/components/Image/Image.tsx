import { ImageProps, Image as TamaguiImage } from 'tamagui';

type ImageVariant = 'login_illustration';
type Props = Omit<ImageProps, 'source'> & {
  variant: ImageVariant;
};

const getImage = (variant: ImageVariant) => {
  switch (variant) {
    case 'login_illustration':
      return require('~/assets/images/ill_login.png');
    default:
      break;
  }
};

export function Image({ variant, ...props }: Props) {
  const uri = getImage(variant);
  return <TamaguiImage source={{ width: 200, height: 200, uri }} {...props} />;
}
