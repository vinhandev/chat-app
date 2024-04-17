import { ChannelProps } from 'stream-chat-expo';

type Props = ChannelProps & { uid: string };
export function useGetUid() {
  function handleGetUid({ channel, uid }: Props) {
    const memberKeys = Object.keys(channel.state.members);
    return memberKeys.find((item) => item !== uid) ?? '';
  }

  return {
    getUid: handleGetUid,
  };
}
