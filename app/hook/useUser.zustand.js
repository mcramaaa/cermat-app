import { create } from "zustand";
export const useUser = create((set) => ({
  user: { id: "", name: "" },
  setUser: (newUser) => set({ user: newUser }),
}));
