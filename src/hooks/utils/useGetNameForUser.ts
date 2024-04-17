import { ChannelProps } from 'stream-chat-expo';
import { useUserStore } from '~/store';

type Props = ChannelProps;
export function useGetNameForUser() {
  const nickNames = useUserStore(
    (state) => state.userMetadata?.nickNames ?? []
  );
  const userNames = useUserStore((state) => state.userNames);
  const email = useUserStore((state) => state.user?.email);

  const handleFilterNameInChannel = ({ channel }: Props) => {
    const channelName = channel?.data?.name ?? '';
    if (!email) return channelName;
    const orgName = channelName.replace(email, '') || 'IT Support';
   return handleFilterName(orgName);
  };

  const handleFilterName = (paramName: string) => {
    const orgName = paramName;
    const nickName = nickNames.find((name) => name.email === orgName);
    if (nickName !== undefined) return nickName.name;
    const userName = userNames.find((name) => name.email === orgName);
    if (userName !== undefined) return userName.name;
    return orgName;
  };
  return {
    getName: handleFilterNameInChannel,
    getNameByString: handleFilterName,
  };
}
