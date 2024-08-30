export type UserProps = {
  id: string;
  name: string;
  image?: string;
};

export type UserMetadataProps = {
  uid: string;
  name: string;
  lastUpdate: number;
  email: string;
  nickNames: { email: string; name: string }[];
  pinned: string[];
};

export type UserNamePayload = {
  email: string;
  name: string;
};
