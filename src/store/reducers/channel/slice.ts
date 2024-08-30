import { createSlice } from '@reduxjs/toolkit';
import type { SliceCaseReducers, SliceSelectors } from '@reduxjs/toolkit';
import { ChannelGetStreamProps } from '~/types/channels';

interface State {
  channel: ChannelGetStreamProps | null;
}

const initialState: State = {
  channel: null,
};

const slice = createSlice<
  State,
  SliceCaseReducers<State>,
  'channel',
  SliceSelectors<State>,
  'channel'
>({
  name: 'channel',
  initialState,
  reducers: {
    updateChannel: (state, action) => {
      state.channel = action.payload;
    },
  },
});

export const { updateChannel } = slice.actions;
export const channelReducer = slice.reducer;
