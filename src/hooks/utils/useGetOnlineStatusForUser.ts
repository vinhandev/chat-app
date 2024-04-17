import { ChannelProps } from 'stream-chat-expo';

type Props = ChannelProps & { uid: string };
export function useGetOnlineStatusForUser() {
  function handleGetOnline({ channel, uid }: Props) {
    const memberKeys = Object.keys(channel.state.members);
    const responseUser =
      channel.state.members[memberKeys.find((item) => item !== uid) ?? ''];

    const online = responseUser.user?.online;
    return online ?? false;
  }

  return {
    getOnline: handleGetOnline,
  };
}
