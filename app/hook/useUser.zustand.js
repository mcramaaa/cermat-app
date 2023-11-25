import { create } from "zustand";
export const useUser = create((set) => ({
  user: { id: "", name: "rama" },
  setUser: (newUser) => set({ user: newUser }),
}));
