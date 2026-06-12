import type { AccountSetting, Session } from '@/features/auth/types';
import { apiClient } from '@/lib/api/axios';

export async function getSession(): Promise<Session | null> {
  const response = await apiClient.get<Session | null>('/v0/auth/check');

  return response.data;
}

export async function getAccountSetting(): Promise<AccountSetting> {
  const response = await apiClient.get<AccountSetting>('/v0/setting');

  return response.data;
}
