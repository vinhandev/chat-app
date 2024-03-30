import { client } from '~/services';
import { UserProps } from '~/types';

export const useConnectUser = () => {
  async function mutation(user: UserProps, token: string) {
    // TODO: remove token if auth is turn on
    const usedToken = client.devToken(user.id);
    await client.connectUser(user, usedToken);
  }

  async function disconnect() {
    await client.disconnectUser();
  }

  return {
    mutation,
    disconnect,
  };
};
