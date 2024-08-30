import { client } from '~/services';
import { useAppSelector } from '~/store/hooks';
import { selectUser } from '~/store/reducers';
import { UserProps } from '~/types';
import { ChannelProps } from '~/types/channels';

export const useGetUserList = () => {
  const user = useAppSelector(selectUser);
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
