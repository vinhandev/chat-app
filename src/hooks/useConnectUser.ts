import { client } from '~/services';

export const useConnectUser = () => {
  async function mutation(
    user: { id: string; name: string; image: string },
    token: string
  ) {
    // TODO: remove token if auth is turn on
    const usedToken = client.devToken(user.id);
    await client.connectUser(user, client.devToken(user.id));
  }

  return {
    mutation,
  };
};
