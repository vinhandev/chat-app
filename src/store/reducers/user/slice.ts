import { createSlice } from '@reduxjs/toolkit';
import type {
  PayloadAction,
  SliceCaseReducers,
  SliceSelectors,
} from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { UserMetadataProps, UserNamePayload } from '~/types';

interface State {
  user: User | null;
  initializing: boolean;
  userNameList: UserNamePayload[] | null;
  metadata: UserMetadataProps | null;
}

const initialState: State = {
  user: null,
  initializing: false,
  userNameList: null,
  metadata: null,
};

const slice = createSlice<
  State,
  SliceCaseReducers<State>,
  'user',
  SliceSelectors<State>,
  'user'
>({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (
      state,
      action: {
        payload: {
          user: User;
          token: string;
        };
      }
    ) => {
      state.user = action.payload.user;
      state.initializing = true;
    },
    updateUserSuccess: (
      state,
      action: {
        payload: {
          userNameList: UserNamePayload[];
          userMetadata: UserMetadataProps;
        };
      }
    ) => {
      state.userNameList = action.payload.userNameList;
      state.metadata = action.payload.userMetadata;
      state.initializing = false;
    },
    updateUserFailed: (state) => {
      state.user = null;
      state.initializing = false;
    },
    updateInitializing: (state, action) => {
      state.initializing = action.payload;
    },
    updateUserNameList: (state, action) => {
      state.userNameList = action.payload;
    },
    updateMetadata: (state, action) => {
      state.metadata = action.payload;
    },
  },
});

export const {
  updateUser,
  updateUserFailed,
  updateUserSuccess,
  updateInitializing,
  updateUserNameList,
  updateMetadata,
} = slice.actions;
export const userReducer = slice.reducer;
