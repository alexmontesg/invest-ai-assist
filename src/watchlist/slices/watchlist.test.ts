import reducer, {
  addAsset,
  removeAsset,
  clearWatchlist,
  hydrateWatchlist,
} from './watchlist';

describe('watchlistSlice', () => {
  const initialState = { assets: [] as string[] };

  it('should return initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should add asset and normalize id (trim + uppercase)', () => {
    const state1 = reducer(initialState, addAsset('  msft  '));

    expect(state1.assets).toEqual(['MSFT']);
  });

  it('should not add duplicate assets', () => {
    let state = reducer(initialState, addAsset('msft'));
    state = reducer(state, addAsset('MSFT'));

    expect(state.assets).toEqual(['MSFT']);
  });

  it('should remove asset', () => {
    let state = reducer(initialState, addAsset('msft'));
    state = reducer(state, removeAsset('msft'));

    expect(state.assets).toEqual([]);
  });

  it('should clear watchlist', () => {
    let state = reducer(initialState, addAsset('msft'));
    state = reducer(state, addAsset('eth'));

    state = reducer(state, clearWatchlist());

    expect(state.assets).toEqual([]);
  });

  it('should hydrate watchlist', () => {
    const state = reducer(initialState, hydrateWatchlist(['MSFT', 'AAPL']));

    expect(state.assets).toEqual(['MSFT', 'AAPL']);
  });
});
