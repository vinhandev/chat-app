import type { SvgProps } from 'react-native-svg';
import type { IconProps } from '@tamagui/helpers-icon';

import GoogleIcon from '~/assets/images/icon_google.svg';
import {
  MoveRight,
  ArrowLeft,
  MessageCircle,
  Pin,
  Search,
  LogOut,
  Settings,
  MoreHorizontal,
  CheckCheck,
  Check,
  MessageCircleWarning,
  Home,
  User,
  Pencil,
} from '@tamagui/lucide-icons';
import { View, ViewProps } from 'tamagui';
type Props =
  | ({
      variant: 'google';
    } & SvgProps)
  | ({
      variant:
        | 'home'
        | 'profile'
        | 'arrow-right'
        | 'back'
        | 'message-circle'
        | 'pin'
        | 'search'
        | 'setting'
        | 'edit'
        | 'received'
        | 'sending'
        | 'failed'
        | 'more'
        | 'logOut';
    } & IconProps);

export type IconVariantProps = Props['variant'];

export const IconItem = (props: Props) => {
  switch (props.variant) {
    case 'google': {
      return <GoogleIcon {...props} />;
    }

    case 'edit': {
      return <Pencil {...props} />;
    }
    case 'home': {
      return <Home {...props} />;
    }
    case 'profile': {
      return <User {...props} />;
    }
    case 'arrow-right': {
      return <MoveRight {...props} />;
    }
    case 'arrow-right': {
      return <MoveRight {...props} />;
    }
    case 'arrow-right': {
      return <MoveRight {...props} />;
    }
    case 'back': {
      return <ArrowLeft {...props} />;
    }
    case 'message-circle': {
      return <MessageCircle {...props} />;
    }
    case 'pin': {
      return <Pin {...props} />;
    }
    case 'search': {
      return <Search {...props} />;
    }
    case 'logOut': {
      return <LogOut {...props} />;
    }
    case 'setting': {
      return <Settings {...props} />;
    }
    case 'more': {
      return <MoreHorizontal {...props} />;
    }
    case 'failed': {
      return <MessageCircleWarning {...props} />;
    }
    case 'received': {
      return <CheckCheck {...props} />;
    }
    case 'sending': {
      return <Check {...props} />;
    }

    default:
      break;
  }
};

export default function Icon({
  containerProps,
  ...props
}: Props & {
  containerProps?: ViewProps;
}) {
  return (
    <View {...containerProps}>
      <IconItem {...props} />
    </View>
  );
}
