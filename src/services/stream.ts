import { StreamChat } from 'stream-chat';

const apiUrl = process.env.EXPO_STREAM_API_KEY ?? '';

export const client = StreamChat.getInstance(apiUrl);
