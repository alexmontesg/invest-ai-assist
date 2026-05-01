import type { StorageAdapter } from '@/persistence/storageAdapter';

export default class LocalStorageAdapter<T> implements StorageAdapter<T> {
  private key: string;

  constructor(config: { key: string }) {
    this.key = config.key;
  }

  async get(): Promise<T | null> {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : null;
  }

  async save(data: T): Promise<void> {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
