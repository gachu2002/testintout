import axios, { type AxiosError } from 'axios';

import { env } from '@/config/env';

const fallbackErrorMessage = 'Something went wrong. Please try again.';

type ApiErrorPayload = {
  details?: unknown;
  error?: string;
  message?: string;
};

export class ApiError extends Error {
  readonly details?: unknown;
  readonly status?: number;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    Accept: 'application/json',
  },
  timeout: 15_000,
  withCredentials: true,
});

export const baseURL = env.apiBaseUrl;

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorPayload>) => Promise.reject(toApiError(error)),
);

export function getErrorMessage(error: unknown, fallback = fallbackErrorMessage) {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  if (typeof error === 'string' && error.trim().length > 0) {
    return error;
  }

  return fallback;
}

function toApiError(error: AxiosError<ApiErrorPayload>) {
  const payload = error.response?.data;
  const message = payload?.message ?? payload?.error ?? error.message ?? fallbackErrorMessage;

  return new ApiError(message, error.response?.status, payload?.details);
}

export default apiClient;
