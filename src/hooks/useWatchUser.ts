import { router } from 'expo-router';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

import { auth } from '~/services';
import { useConnectUser } from './useConnectUser';
import { useUserStore } from '~/store';

export function useWatchUser() {
  const { user, setUser, initializing, setInitializing } = useUserStore(
    (state) => {
      return {
        user: state.user,
        setUser: state.setUser,
        initializing: state.initializing,
        setInitializing: state.setInitializing,
      };
    }
  );
  const { mutation: connect, disconnect } = useConnectUser();

  const mutation = () => {
    const unsubscribe = onAuthStateChanged(auth, async (tmpUser) => {
      setInitializing(true);
      console.log('user', user);
      try {
        if (tmpUser) {
          setUser(tmpUser);
          const token = await tmpUser.getIdToken();
          if (tmpUser.email) {
            await connect(
              {
                id: tmpUser.uid,
                name: tmpUser.email ?? '',
                image: tmpUser.photoURL ?? '',
              },
              token
            );
            router.replace('/main');
          }
        } else {
          setUser(null);
          await disconnect();
          router.replace('/login');
        }
      } catch (error) {
        console.error(error);
      }
      setInitializing(false);
    });

    return unsubscribe;
  };

  return {
    user,
    mutation,
  };
}
