import type { PayloadActionCreator } from '@reduxjs/toolkit';

import type { StorageAdapter } from '@/persistence/storageAdapter';
import type { AppDispatch } from '@/store/store';

export async function bootstrap<T>(
  dispatch: AppDispatch,
  storage: StorageAdapter<T>,
  hydrate: PayloadActionCreator<T>,
) {
  const data = await storage.get();

  if (data) {
    dispatch(hydrate(data));
  }
}
