import type { StorageAdapter } from '@/persistence/storageAdapter';
import LocalStorageAdapter from '@/persistence/localStorageAdapter';
import ApiStorageAdapter from '@/persistence/apiStorageAdapter';

type StorageConfigMap = {
  local: { key: string };
  api: { endpoint: string };
};

type StorageConstructors = {
  [K in keyof StorageConfigMap]: new <T>(
    config: StorageConfigMap[K],
  ) => StorageAdapter<T>;
};

const STORAGES: StorageConstructors = {
  local: LocalStorageAdapter,
  api: ApiStorageAdapter,
};

type StorageType = keyof typeof STORAGES;

export class StorageFactory {
  static create<K extends keyof StorageConfigMap, T>(
    type: StorageType,
    config: StorageConfigMap[K],
  ): StorageAdapter<T> {
    const Adapter = STORAGES[type] as StorageConstructors[K];

    if (!Adapter) {
      throw new Error('Invalid storage type');
    }

    return new Adapter<T>(config);
  }
}
