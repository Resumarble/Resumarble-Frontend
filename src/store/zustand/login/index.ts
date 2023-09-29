import { create } from "zustand";

interface StoreState {
  isLoggedIn: boolean;
}

interface StoreActions {
  login: () => void;
  logout: () => void;
}

type Store = StoreState & StoreActions;

const useStore = create<Store>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));

export default useStore;
