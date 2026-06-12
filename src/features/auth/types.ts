export type AccountSetting = {
  language?: string;
  theme?: string;
  timezone?: string;
  [key: string]: unknown;
};

export type Session = {
  displayname?: string;
  displayName?: string;
  email?: string;
  exp?: number;
  iat?: number;
  id?: string;
  name?: string;
  roles?: string[];
  sub?: string;
  userId?: string;
  userid?: string;
  username?: string;
};
