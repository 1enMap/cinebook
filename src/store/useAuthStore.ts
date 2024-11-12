import { create } from 'zustand';
import { auth } from '../lib/auth';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: auth.getUser(),
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { user, error } = await auth.signIn(email, password);
      if (error) throw new Error(error);
      set({ user });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
  signUp: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const { user, error } = await auth.signUp(email, password, name);
      if (error) throw new Error(error);
      set({ user });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
  signOut: async () => {
    await auth.signOut();
    set({ user: null });
  },
}));