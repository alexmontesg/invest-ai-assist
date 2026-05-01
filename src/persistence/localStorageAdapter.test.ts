import LocalStorageAdapter from './localStorageAdapter';

describe('localStorageAdapter', () => {
  const KEY = 'test-key';

  const createAdapter = () =>
    new LocalStorageAdapter<{ asset: string }>({
      key: KEY,
    });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should persist an item to the local storage', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const adapter = createAdapter();

    await adapter.save({ asset: 'GOLD' });

    expect(setItemSpy).toHaveBeenCalledWith(
      KEY,
      JSON.stringify({ asset: 'GOLD' }),
    );
  });

  it('should get stored data', async () => {
    const getItemMock = vi.spyOn(Storage.prototype, 'getItem');
    const adapter = createAdapter();

    await adapter.get();

    expect(getItemMock).toHaveBeenCalledOnce();
  });
});
