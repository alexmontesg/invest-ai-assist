import type { StorageAdapter } from '@/persistence/storageAdapter';

export default class ApiStorageAdapter<T> implements StorageAdapter<T> {
  private endpoint;

  constructor(config: { endpoint: string }) {
    this.endpoint = config.endpoint;
  }

  async get(): Promise<T | null> {
    throw new Error('Not implemented yet');
  }

  async save(data: T): Promise<void> {
    throw new Error('Not implemented yet');
  }
}
