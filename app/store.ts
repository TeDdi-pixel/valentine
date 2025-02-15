import { create } from "zustand";

export const usePlay = create((set) => ({
  isPlaying: false,
  updateBears: (status: boolean) => set({ isPlaying: !status }),
}));
