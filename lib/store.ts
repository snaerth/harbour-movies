import { create } from 'zustand';
import { createStoreSlice, StoreSlice } from './slices/storeSlice';

type StoreState = StoreSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createStoreSlice(...a),
}));
