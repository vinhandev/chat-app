import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '~/services';
import { useAppDispatch } from '~/store/hooks';
import { updateUser, updateUserFailed } from '~/store/reducers';

export function useWatchUser() {
  const dispatch = useAppDispatch();

  const mutation = () => {
    const unsubscribe = onAuthStateChanged(auth, async (tmpUser) => {
      if (tmpUser) {
        const token = await tmpUser.getIdToken();
        dispatch(
          updateUser({
            user: tmpUser,
            token,
          })
        );
      } else {
        dispatch(updateUserFailed(null));
      }
    });

    return unsubscribe;
  };

  return mutation;
}
