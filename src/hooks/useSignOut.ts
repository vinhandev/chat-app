import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '~/services';

export const useSignOut = () => {
  
  const mutation = async () => {
    const response = await signOut(auth);

    return response;
  };

  return {
    mutation,
  };
};
