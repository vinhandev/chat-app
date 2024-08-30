import { RootState } from '~/store';

export const selectUser = (state: RootState) => state.user.user;
export const selectInitializing = (state: RootState) => state.user.initializing;
export const selectMetadata = (state: RootState) => state.user.metadata;
export const selectUserNameList = (state: RootState) => state.user.userNameList;
