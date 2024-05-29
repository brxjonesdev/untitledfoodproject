import { create } from 'zustand';

interface GameplayStore {
  // Waiting Room & General State
  hasGameStarted: boolean;
  phase: string;
  isFauxLoading: boolean;
  isRoomLocked: boolean;
  // Phase One State
}

interface GameplayStoreActions {
  // Waiting Room & General Actions
  setHasGameStarted: (hasGameStarted: boolean) => void;
  setPhase: (phase: string) => void;
  setIsFauxLoading: (isFauxLoading: boolean) => void;
  setIsRoomLocked: (isRoomLocked: boolean) => void;
}

const useGameplayStore = create<GameplayStore & GameplayStoreActions>(
  (set) => ({
    // Waiting Room & General State
    hasGameStarted: false,
    phase: '',
    isFauxLoading: false,
    isRoomLocked: false,
    // Phase One State
    // Waiting Room & General Actions
    setHasGameStarted: (hasGameStarted) => set({ hasGameStarted }),
    setPhase: (phase) => set({ phase }),
    setIsFauxLoading: (isFauxLoading) => set({ isFauxLoading }),
    setIsRoomLocked: (isRoomLocked) => set({ isRoomLocked }),
  })
);

export default useGameplayStore;
