import { create } from "zustand";
export const useRemoinder = create((set) => ({
  sikatGigi: 0,
  setSikatGigi: (newSikatGigi) => set({ sikatGigi: newSikatGigi }),
}));
