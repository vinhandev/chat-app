import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '~/services';

export const useSignUpPassword = () => {
  const mutation = async (username: string, password: string) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      username,
      password
    );

    return response;
  };

  return {
    mutation,
  };
};
