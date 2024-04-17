export type ChannelProps = {
  type: string;
  metadata: ChannelMetadataProps;
};

export type ChannelMetadataProps = {
  name: string;
  members: string[];
};

export type ChannelGetStreamProps = {
  cid: string;
  config: {
    automod: string;
    automod_behavior: string;
    commands: [[Object]];
    connect_events: boolean;
    created_at: string;
    custom_events: boolean;
    mark_messages_pending: boolean;
    max_message_length: number;
    message_retention: 'infinite';
    mutes: boolean;
    name: string;
    push_notifications: boolean;
    quotes: boolean;
    reactions: boolean;
    read_events: boolean;
    reminders: false;
    replies: true;
    search: true;
    typing_events: true;
    updated_at: '2024-04-10T09:20:46.570922646Z';
    uploads: true;
    url_enrichment: true;
  };
  created_at: '2024-03-31T08:37:26.205916Z';
  created_by: {
    banned: false;
    created_at: '2024-03-31T08:37:25.691943Z';
    id: 'aobwWbJyF4Nhn5MW8Y9B5ccxdhx1';
    image: '';
    last_active: '2024-04-11T01:07:11.528762099Z';
    name: 'vinhan.dev3@gmail.com';
    online: true;
    role: 'user';
    updated_at: '2024-03-31T08:37:25.693532Z';
  };
  disabled: false;
  frozen: false;
  hidden: false;
  id: '!members-2wVOe7uNyHS6ZRS8jlc_HnzEvxO-AgeQ11g0uqVc55Y';
  member_count: 2;
  name: 'vinhan.dev2@gmail.comvinhan.dev3@gmail.com';
  own_capabilities: [
    'connect-events',
    'create-call',
    'delete-channel',
    'delete-own-message',
    'flag-message',
    'join-call',
    'join-channel',
    'leave-channel',
    'mute-channel',
    'pin-message',
    'quote-message',
    'read-events',
    'search-messages',
    'send-custom-events',
    'send-links',
    'send-message',
    'send-reaction',
    'send-reply',
    'send-typing-events',
    'typing-events',
    'update-channel',
    'update-own-message',
    'update-thread',
    'upload-file'
  ];
  type: 'messaging';
  updated_at: '2024-03-31T08:37:26.205916Z';
};

export type ChannelLastMessageStatusType = 'sending' | 'received' | 'failed';
