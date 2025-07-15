import { create } from "zustand";
import authService, { User } from "../services/auth.service";

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  startLoading: () => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const useAuth = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  isLoading: false,
  startLoading: () => set({ isLoading: true }),
  isAuthenticated: false,
  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuth;
