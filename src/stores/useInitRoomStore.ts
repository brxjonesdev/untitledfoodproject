import {create} from 'zustand';

interface RoomStore {
    roomInfo:{
        roomOwner: string;
        roomName: string;
        roomCode: string;
        restaurantOption: "Breakfast" | "Lunch" | "Dinner" | "Sweet Treat Mode";
        users: {
            order: number;
            userName: string;
            socketId: string;
            picks: string[];
            bans: string[];
        }[]
    }
    initInfo:{
        isCreateModalOpen: boolean;
        isJoinModalOpen: boolean;
        enteredUserName: string;
        enteredRoomName: string;
        enteredRoomCode: string;
        enteredRestaurantOption: "Breakfast" | "Lunch" | "Dinner" | "Sweet Treat Mode";
        isSendingToServer: boolean;
        joinStatus: string;
        createStatus: string;
        hasGameStarted: boolean;
    }
}

interface RoomStoreActions {
    setRoomInfo: (roomInfo: RoomStore['roomInfo']) => void;
    setInitInfo: (initInfo: RoomStore['initInfo']) => void;
    toggleCreateModal: () => void;
    toggleJoinModal: () => void;
    setEnteredUserName: (userName: string) => void;
    setEnteredRoomName: (roomName: string) => void;
    setEnteredRoomCode: (roomCode: string) => void;
    setEnteredRestaurantOption: (restaurantOption: "Breakfast" | "Lunch" | "Dinner" | "Sweet Treat Mode") => void;
    setIsSendingToServer: (isSendingToServer: boolean) => void;
    setJoinStatus: (joinStatus: string) => void;
    setCreateStatus: (createStatus: string) => void;
    setHasGameStarted: (hasGameStarted: boolean) => void;
}

const useRoomStore = create<RoomStore & RoomStoreActions>((set) => ({
    roomInfo: {
        roomOwner: "",
        roomName: "",
        roomCode: "",
        restaurantOption: "Breakfast",
        users: []
    },
    initInfo: {
        isCreateModalOpen: false,
        isJoinModalOpen: false,
        enteredUserName: "",
        enteredRoomName: "",
        enteredRoomCode: "",
        enteredRestaurantOption: "Breakfast",
        isSendingToServer: false,
        joinStatus: "",
        createStatus: "",
        hasGameStarted: false
    },
    setRoomInfo: (roomInfo) => set((state) => ({roomInfo})),
    setInitInfo: (initInfo) => set((state) => ({initInfo})),
    toggleCreateModal: () => set((state) => ({initInfo: {...state.initInfo, isCreateModalOpen: !state.initInfo.isCreateModalOpen}})),
    toggleJoinModal: () => set((state) => ({initInfo: {...state.initInfo, isJoinModalOpen: !state.initInfo.isJoinModalOpen}})),
    setEnteredUserName: (userName) => set((state) => ({initInfo: {...state.initInfo, enteredUserName: userName}})),
    setEnteredRoomName: (roomName) => set((state) => ({initInfo: {...state.initInfo, enteredRoomName: roomName}})),
    setEnteredRoomCode: (roomCode) => set((state) => ({initInfo: {...state.initInfo, enteredRoomCode: roomCode}})),
    setEnteredRestaurantOption: (restaurantOption) => set((state) => ({initInfo: {...state.initInfo, enteredRestaurantOption: restaurantOption}})),
    setIsSendingToServer: (isSendingToServer) => set((state) => ({initInfo: {...state.initInfo, isSendingToServer: isSendingToServer}})),
    setJoinStatus: (joinStatus) => set((state) => ({initInfo: {...state.initInfo, joinStatus: joinStatus}})),
    setCreateStatus: (createStatus) => set((state) => ({initInfo: {...state.initInfo, createStatus: createStatus}})),
    setHasGameStarted: (hasGameStarted) => set((state) => ({initInfo: {...state.initInfo, hasGameStarted: hasGameStarted}}))
}));

export default useRoomStore;
