import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth } from '~/services';

export const useSignInGoogle = () => {
  const mutation = async () => {
    const provider = new GoogleAuthProvider();
    const response = await signInWithRedirect(auth, provider);

    return response;
  };

  return {
    mutation,
  };
};
