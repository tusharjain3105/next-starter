import { create } from "zustand";
import { User } from "../services/auth.service";

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  startLoading: () => void;
  isAuthenticated: boolean;
}

const useAuth = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  isLoading: false,
  startLoading: () => set({ isLoading: true }),
  isAuthenticated: false,
}));

export default useAuth;
