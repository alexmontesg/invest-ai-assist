import { StorageFactory } from '@/persistence/factory';

export const ordersStorage = StorageFactory.create<string[], 'local'>('local', {
  key: 'orders',
});
