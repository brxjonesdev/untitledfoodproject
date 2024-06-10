import { create } from 'zustand';

interface GameplayStore {
  // Waiting Room & General State
  hasGameStarted: boolean;
  phase: string;
  isFauxLoading: boolean;
  isRoomLocked: boolean;
  gameplayMessage: string;
  isVoting: boolean | null;
  choices: {
    voter: string;
    choice: string;
  }[];

  // Phase One State
}

interface GameplayStoreActions {
  // Waiting Room & General Actions
  setHasGameStarted: (hasGameStarted: boolean) => void;
  setPhase: (phase: string) => void;
  setIsFauxLoading: (isFauxLoading: boolean) => void;
  setIsRoomLocked: (isRoomLocked: boolean) => void;
  setGameplayMessage: (gameplayMessage: string) => void;
  setIsVoting: (isVoting: boolean) => void;
  setChoices: (choices: {
    voter: string;
    choice: string;
  }[]) => void;
}

const useGameplayStore = create<GameplayStore & GameplayStoreActions>(
  (set) => ({
    // Waiting Room & General State
    hasGameStarted: false,
    phase: '',
    isFauxLoading: false,
    isRoomLocked: false,
    gameplayMessage: '',
    isVoting: null,
    choices: [],

    // Phase One State
    // Waiting Room & General Actions
    setHasGameStarted: (hasGameStarted) => set({ hasGameStarted }),
    setPhase: (phase) => set({ phase }),
    setIsFauxLoading: (isFauxLoading) => set({ isFauxLoading }),
    setIsRoomLocked: (isRoomLocked) => set({ isRoomLocked }),
    setGameplayMessage: (gameplayMessage) => set({ gameplayMessage }),
    setIsVoting: (isVoting) => set({ isVoting }),
    setChoices: (choices) => set({ choices }),

  })
);

export default useGameplayStore;
