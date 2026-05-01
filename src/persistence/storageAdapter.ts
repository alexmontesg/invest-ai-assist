export interface StorageAdapter<T> {
  get(): Promise<T | null>;
  save(data: T): Promise<void>;
}
