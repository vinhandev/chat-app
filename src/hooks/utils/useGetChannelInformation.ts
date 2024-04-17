import { ChannelProps } from 'stream-chat-expo';
import { useGetNameForUser } from './useGetNameForUser';
import { useGetOnlineStatusForUser } from './useGetOnlineStatusForUser';
import { useGetUid } from './useGetUid';
import { ChannelLastMessageStatusType } from '~/types/channels';

type Props = ChannelProps & {
  uid: string;
  email: string;
};
export const useGetChannelInformation = () => {
  const { getName } = useGetNameForUser();
  const { getUid } = useGetUid();
  const { getOnline } = useGetOnlineStatusForUser();

  const handleGetInformation = ({ channel, email, uid }: Props) => {
    const paramUid = uid ?? '';

    const name = getName({ channel });
    const online = getOnline({ channel, uid: paramUid });
    const channelUid = getUid({ channel, uid: paramUid });
    const lastMessage = channel?.lastMessage();
    const description = lastMessage?.text ?? '';
    const status = (lastMessage?.status as ChannelLastMessageStatusType) ?? '';
    const time = lastMessage?.created_at?.getTime() ?? 0;
    const unReadCount = channel?.countUnread() ?? 0;
    const image = channel.state.members[channelUid].user?.image ?? '';

    return {
      name,
      online,
      channelUid,
      description,
      status,
      time,
      unReadCount,
      image,
    };
  };

  return handleGetInformation;
};
