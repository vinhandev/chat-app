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
} from '@tamagui/lucide-icons';
type Props =
  | ({
      variant: 'google';
    } & SvgProps)
  | ({
      variant:
        | 'arrow-right'
        | 'back'
        | 'message-circle'
        | 'pin'
        | 'search'
        | 'setting'
        | 'more'
        | 'logOut';
    } & IconProps);

export type IconVariantProps = Props['variant'];

export function Icon(props: Props) {
  switch (props.variant) {
    case 'google': {
      return <GoogleIcon {...props} />;
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

    default:
      break;
  }
}
