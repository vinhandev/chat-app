import { client } from '~/services';
import { useUserStore } from '~/store';
import { UserProps } from '~/types';
import { ChannelProps } from '~/types/channels';

export const useGetUserList = () => {
  const user = useUserStore((state) => state.user);
  async function mutation() {
    if (user) {
      const response = await client.queryUsers({});
      const userList: UserProps[] = response.users.map((item) => ({
        id: item.id,
        image: '',
        name: item.name ?? '',
      }));
      return userList;
    }
  }

  return {
    mutation,
  };
};
