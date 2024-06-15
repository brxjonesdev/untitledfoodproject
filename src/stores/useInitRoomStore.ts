import { create } from 'zustand';

export interface RoomInfo {
  roomOwner: string;
  roomName: string;
  roomCode: string;
  restaurantOption: string;
  users: {
    order?: number;
    userName: string;
    isOwner: boolean;
    socketId: string | undefined;
  }[];
}

export interface InitInfo {
  isCreateModalOpen: boolean;
  isJoinModalOpen: boolean;
  enteredUserName: string;
  enteredRoomCode: string;
  isSendingToServer: boolean;
  joinStatus: string;
  createStatus: string;
  hasGameStarted: boolean;
  isInWaitingRoom: boolean;
}

export interface RoomStore {
  roomInfo: RoomInfo;
  initInfo: InitInfo;
}

export interface RoomStoreActions {
  setRoomInfo: (roomInfo: RoomInfo) => void;
  setInitInfo: (initInfo: InitInfo) => void;
  toggleCreateModal: () => void;
  toggleJoinModal: () => void;
  setEnteredUserName: (userName: string) => void;
  setEnteredRoomCode: (roomCode: string) => void;
  setEnteredRestaurantOption: (restaurantOption: string) => void;
  setIsSendingToServer: (isSendingToServer: boolean) => void;
  setJoinStatus: (joinStatus: string) => void;
  setCreateStatus: (createStatus: string) => void;
  setHasGameStarted: (hasGameStarted: boolean) => void;
  setIsInWaitingRoom: (isInWaitingRoom: boolean) => void;
  setUsers: (users: RoomInfo['users']) => void;
}

const useRoomStore = create<RoomStore & RoomStoreActions>((set) => ({
  roomInfo: {
    roomOwner: '',
    roomName: '',
    roomCode: '',
    restaurantOption: 'Breakfast',
    users: [],
  },
  initInfo: {
    isCreateModalOpen: false,
    isJoinModalOpen: false,
    enteredUserName: '',
    enteredRoomCode: '',
    isSendingToServer: false,
    joinStatus: '',
    createStatus: '',
    hasGameStarted: false,
    isInWaitingRoom: false,
  },
  setRoomInfo: (roomInfo) => set({ roomInfo }),
  setInitInfo: (initInfo) => set({ initInfo }),
  toggleCreateModal: () =>
    set((state) => ({
      initInfo: {
        ...state.initInfo,
        isCreateModalOpen: !state.initInfo.isCreateModalOpen,
      },
    })),
  toggleJoinModal: () =>
    set((state) => ({
      initInfo: {
        ...state.initInfo,
        isJoinModalOpen: !state.initInfo.isJoinModalOpen,
      },
    })),
  setEnteredUserName: (enteredUserName) =>
    set((state) => ({ initInfo: { ...state.initInfo, enteredUserName } })),
  setEnteredRoomCode: (enteredRoomCode) =>
    set((state) => ({ initInfo: { ...state.initInfo, enteredRoomCode } })),
  setEnteredRestaurantOption: (restaurantOption) =>
    set((state) => ({ initInfo: { ...state.initInfo, restaurantOption } })),
  setIsSendingToServer: (isSendingToServer) =>
    set((state) => ({ initInfo: { ...state.initInfo, isSendingToServer } })),
  setJoinStatus: (joinStatus) =>
    set((state) => ({ initInfo: { ...state.initInfo, joinStatus } })),
  setCreateStatus: (createStatus) =>
    set((state) => ({ initInfo: { ...state.initInfo, createStatus } })),
  setHasGameStarted: (hasGameStarted) =>
    set((state) => ({ initInfo: { ...state.initInfo, hasGameStarted } })),
  setIsInWaitingRoom: (isInWaitingRoom) =>
    set((state) => ({ initInfo: { ...state.initInfo, isInWaitingRoom } })),
  setUsers: (users) =>
    set((state) => ({ roomInfo: { ...state.roomInfo, users } })),
}));

export default useRoomStore;
