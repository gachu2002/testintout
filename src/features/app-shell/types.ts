export type CurrentUser = {
  capabilities: {
    isAdmin: boolean;
  };
  createdAt: string;
  displayName: string;
  email: string;
  familyName: string | null;
  fullname: string;
  givenName: string | null;
  id: string;
  job: string | null;
  lastLoginedAt: string;
  name: string;
  organization: string[];
  photo?: string | null;
  position: string | null;
  preferences: {
    language: string;
    theme: string;
    timezone: string;
  };
  roles: string[];
  sub: string;
  summary: {
    projectCount: number;
    unreadNotificationCount: number;
  };
  updatedAt: string;
  userId: string | null;
  username: string;
};

export type ServiceMenuLink = {
  description: string;
  href: string;
  icon: string;
  label: string;
};

export type ServiceMenuGroup = {
  id: string;
  links: ServiceMenuLink[];
  title: string;
};

export type ServiceMenuResponseData = {
  items: ServiceMenuGroup[];
};

export type Notification = {
  createdAt: string;
  decidedAt: string | null;
  direction: string;
  executedAt: string | null;
  id: string;
  isUnread: boolean;
  message: string;
  projectId: string | null;
  readAt: string | null;
  status: string;
  title: string;
  type: string;
  updatedAt: string;
};
