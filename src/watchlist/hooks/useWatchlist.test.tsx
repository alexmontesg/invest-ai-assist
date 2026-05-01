import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useWatchlist from './useWatchlist';
import { createWrapper } from '@/watchlist/test/utils';

describe('useWatchlist', () => {
  it('should return initial empty assets', () => {
    const { result } = renderHook(() => useWatchlist(), {
      wrapper: createWrapper(),
    });

    expect(result.current.assets).toEqual([]);
  });

  it('should add an asset', () => {
    const { result } = renderHook(() => useWatchlist(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleAdd('btc');
    });

    expect(result.current.assets).toEqual(['BTC']);
  });

  it('should remove an asset', () => {
    const { result } = renderHook(() => useWatchlist(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleAdd('btc');
    });

    act(() => {
      result.current.handleRemove('btc');
    });

    expect(result.current.assets).toEqual([]);
  });
});
