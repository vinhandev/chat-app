import { Icon } from '../Icon/Icon';

type Props = {
  status: 'received' | 'sending' | 'failed' | '';
  size: number;
};
export default function LastMessageStatus({ status, size }: Props) {
  if (status === '') {
    return null;
  }
  return <Icon variant={status} size={size} color={'black'} />;
}
