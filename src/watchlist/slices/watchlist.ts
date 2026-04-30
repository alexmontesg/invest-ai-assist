import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  assets: [] as Array<string>,
};

type AssetPayload = {
  id: string;
};

const prepare = (id: string): { payload: AssetPayload } => {
  return {
    payload: {
      id: id.trim().toUpperCase(),
    },
  };
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addAsset: {
      reducer: (state, action: PayloadAction<AssetPayload>) => {
        if (!state.assets.includes(action.payload.id)) {
          state.assets.push(action.payload.id);
        }
      },

      prepare,
    },
    removeAsset: {
      reducer: (state, action: PayloadAction<AssetPayload>) => {
        state.assets = state.assets.filter((id) => id !== action.payload.id);
      },

      prepare,
    },
    clearWatchlist: (state) => {
      state.assets = [];
    },
  },
});

export const { addAsset, removeAsset, clearWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;
