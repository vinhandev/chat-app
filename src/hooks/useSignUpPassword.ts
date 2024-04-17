import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, doc, setDoc } from 'firebase/firestore';
import { auth, db, usersCollection } from '~/services';

export const useSignUpPassword = () => {
  const mutation = async (username: string, password: string, name: string) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      username,
      password
    );
    await setDoc(doc(usersCollection, response.user.uid), {
      uid: response.user.uid,
      name,
      lastUpdate: new Date().getTime(),
      email: username,
      nickNames: [],
      pinned: [],
    });

    return response;
  };

  return {
    mutation,
  };
};
