import { create } from "zustand";

export interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
  dateOfBirth: string;
}

interface AuthState {
  authState: User | null;
  setAuthState: (user: User) => void;
  clearAuthState: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  authState: null,
  setAuthState: (authState) => set({ authState }),
  clearAuthState: () => set({ authState: null }),
}));

export default useAuthStore;
