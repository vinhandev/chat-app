import { ChannelProps } from 'stream-chat-expo';
import { useAppSelector } from '~/store/hooks';
import {
  selectMetadata,
  selectUser,
  selectUserNameList,
} from '~/store/reducers';

type Props = ChannelProps;
export function useGetNameForUser() {
  const nickNames = useAppSelector(selectMetadata)?.nickNames ?? [];
  const userNames = useAppSelector(selectUserNameList) ?? [];
  const email = useAppSelector(selectUser)?.email ?? '';

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
