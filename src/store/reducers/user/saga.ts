import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { updateUser, updateUserFailed, updateUserSuccess } from './slice';
import { User } from 'firebase/auth';
import { router } from 'expo-router';
import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { usersCollection } from '~/services';
import { UserMetadataProps } from '~/types';
import { useConnectUser } from '../../../hooks/useConnectUser';

function* updateUserSaga(action: {
  payload: {
    user: User;
    token: string;
  };
}) {
  const { connect, disconnect } = useConnectUser();
  const responseUser = action.payload.user;
  const token = action.payload.token;
  const uid = responseUser.uid;
  const email = responseUser.email;
  console.log('Hello updateUserSaga', responseUser.uid);

  try {
    if (responseUser) {
      if (responseUser.email) {
        const firebase: QuerySnapshot<DocumentData, DocumentData> = yield call(
          getDocs,
          usersCollection
        );
        const userNames = firebase.docs.map((doc) => ({
          email: doc.data().email,
          name: doc.data().name,
        }));
        const userDoc = doc(usersCollection, uid);
        const userStore: DocumentSnapshot<DocumentData, DocumentData> =
          yield call(getDoc, userDoc);
        const data: UserMetadataProps = yield call(userStore.data);

        yield call(
          connect,
          {
            id: uid,
            name: email ?? '',
          },
          token
        );

        router.replace('/main');
        yield put({
          type: updateUserSuccess.type,
          payload: {
            userNameList: userNames,
            userMetadata: data,
          },
        });
      }
    } else {
      yield put({
        type: updateUserFailed.type,
      });
      yield call(disconnect);
      router.replace('/login');
    }
  } catch (error) {
    console.error(error);
    yield put({
      type: updateUserFailed.type,
    });
  }
}

export function* userSaga() {
  yield takeEvery(updateUser, updateUserSaga);
}
