import { client } from '~/services';
import { ChannelProps } from '~/types/channels';

export const useCreateChannel = () => {
  async function mutation(channel: ChannelProps) {
    const { id, type, metadata } = channel;
    const response = await client.channel(type, id, metadata);
    return response;
  }

  return {
    mutation,
  };
};
