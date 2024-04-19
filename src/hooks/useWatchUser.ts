import { router } from 'expo-router';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

import { auth, usersCollection } from '~/services';
import { useConnectUser } from './useConnectUser';
import { useUserStore } from '~/store';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { UserMetadataProps } from '~/types';
import { sleep } from '~/utils';

export function useWatchUser() {
  const { setUser, setInitializing, setUserMetadata, setUserNames } =
    useUserStore((state) => {
      return {
        setUser: state.setUser,
        setInitializing: state.setInitializing,
        setUserNames: state.setUserNames,
        userMetadata: state.userMetadata,
        setUserMetadata: state.setUserMetadata,
      };
    });
  const { mutation: connect, disconnect } = useConnectUser();

  const mutation = () => {
    const unsubscribe = onAuthStateChanged(auth, async (tmpUser) => {
      setInitializing(true);
      sleep(1000);
      try {
        if (tmpUser) {
          setUser(tmpUser);
          const token = await tmpUser.getIdToken();
          if (tmpUser.email) {
            const firebase = await getDocs(usersCollection);
            const userNames = firebase.docs.map((doc) => ({
              email: doc.data().email,
              name: doc.data().name,
            }));
            setUserNames(userNames);

            const userStore = getDoc(doc(usersCollection, tmpUser.uid));
            const data = (await userStore).data() as UserMetadataProps;
            setUserMetadata(data);
            await connect(
              {
                id: tmpUser.uid,
                name: tmpUser.email ?? '',
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

  return mutation;
}
