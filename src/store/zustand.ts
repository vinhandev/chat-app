import { User } from 'firebase/auth';
import { create } from 'zustand';
import { ChannelGetStreamProps } from '~/types/channels';

type initState = {
  user: User | null;
  setUser: (user: User | null) => void;
  initializing: boolean;
  setInitializing: (initializing: boolean) => void;
  channel: ChannelGetStreamProps | null;
  setChannel: (channel: ChannelGetStreamProps | null) => void;
};

export const useUserStore = create<initState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  initializing: true,
  setInitializing: (initializing) => set({ initializing }),
  channel: null,
  setChannel: (channel) => set({ channel }),
}));
