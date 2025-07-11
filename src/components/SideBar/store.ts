import { create } from "zustand";

interface ActiveFriendStore {
  activeFriend: string;
  setActiveFriend: (username: string) => void;
}

const useActiveFriendStore = create<ActiveFriendStore>((set) => ({
  activeFriend: "",
  setActiveFriend: (username) => set(() => ({ activeFriend: username })),
}));

export default useActiveFriendStore;
