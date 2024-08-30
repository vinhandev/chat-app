import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/services';

export const useSignInPassword = () => {
  const mutation = async (username: string, password: string) => {
    const response = await signInWithEmailAndPassword(auth, username, password);
    return response;
  };

  return {
    mutation,
  };
};
