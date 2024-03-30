import { Chat, OverlayProvider } from 'stream-chat-expo';
import { client } from '~/services';
export const Stream = ({ children }: { children: React.ReactNode }) => {
  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};
