import { client } from '~/services';
import { ChannelProps } from '~/types/channels';

export const useCreateChannel = () => {
  async function mutation(channel: ChannelProps) {
    const { type, metadata } = channel;
    const response = await client.channel(type, metadata);
    return response;
  }

  return {
    mutation,
  };
};
