import { create } from 'zustand';

import { env } from '@/config/env';

const referenceStatusStorageKey = 'workspace.referenceStatusVisible';

type AppStore = {
  referenceStatusVisible: boolean;
  searchQueriesByPath: Record<string, string>;
  setSearchQuery: (path: string, query: string) => void;
  toggleReferenceStatusVisible: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
  referenceStatusVisible: readInitialReferenceStatusVisible(),
  searchQueriesByPath: {},
  setSearchQuery: (path, query) =>
    set((state) => ({
      searchQueriesByPath: {
        ...state.searchQueriesByPath,
        [path]: query,
      },
    })),
  toggleReferenceStatusVisible: () =>
    set((state) => {
      const referenceStatusVisible = !state.referenceStatusVisible;

      writeReferenceStatusPreference(referenceStatusVisible);

      return { referenceStatusVisible };
    }),
}));

function readInitialReferenceStatusVisible() {
  const queryPreference = readReferenceStatusQueryPreference();

  if (typeof queryPreference === 'boolean') {
    return queryPreference;
  }

  const storedPreference = readStoredReferenceStatusPreference();

  if (typeof storedPreference === 'boolean') {
    return storedPreference;
  }

  return env.showReferenceStatus;
}

function readReferenceStatusQueryPreference() {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const query = new URLSearchParams(window.location.search);
  const value = query.get('refStatus') ?? query.get('status');

  return parseBooleanPreference(value);
}

function readStoredReferenceStatusPreference() {
  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    return parseBooleanPreference(window.localStorage.getItem(referenceStatusStorageKey));
  } catch {
    return undefined;
  }
}

function writeReferenceStatusPreference(visible: boolean) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(referenceStatusStorageKey, visible ? 'true' : 'false');
  } catch {
    // Ignore storage failures; the in-memory toggle still works for this session.
  }
}

function parseBooleanPreference(value: string | null) {
  if (value === null) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();

  if (['1', 'true', 'yes', 'on'].includes(normalized)) {
    return true;
  }

  if (['0', 'false', 'no', 'off'].includes(normalized)) {
    return false;
  }

  return undefined;
}
