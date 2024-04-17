import { User } from 'firebase/auth';
import { create } from 'zustand';
import { UserMetadataProps } from '~/types';
import { ChannelGetStreamProps } from '~/types/channels';

type initState = {
  user: User | null;
  setUser: (user: User | null) => void;
  initializing: boolean;
  setInitializing: (initializing: boolean) => void;
  channel: ChannelGetStreamProps | null;
  setChannel: (channel: ChannelGetStreamProps | null) => void;
  userNames: { email: string; name: string }[];
  setUserNames: (nickNames: { email: string; name: string }[]) => void;
  userMetadata: UserMetadataProps | null;
  setUserMetadata: (userMetadata: UserMetadataProps) => void;
};

export const useUserStore = create<initState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  userMetadata: null,
  setUserMetadata: (userMetadata) => set({ userMetadata }),
  initializing: true,
  setInitializing: (initializing) => set({ initializing }),
  channel: null,
  setChannel: (channel) => set({ channel }),
  userNames: [],
  setUserNames: (userNames) => set({ userNames }),
}));
