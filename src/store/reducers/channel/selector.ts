import { RootState } from '~/store';

export const selectChannel = (state: RootState) => state.channel.channel;
