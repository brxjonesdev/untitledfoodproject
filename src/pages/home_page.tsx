import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import io from 'socket.io-client';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useMediaQuery } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import GameRules from '@/components/rules';
import { getRandomColor } from '@/lib/utils';
import WaitingRoom from '@/components/waitingRoom';
import Gameplay from '@/components/gameplay';
import useRoomStore from '@/stores/useInitRoomStore';
import { useEffect } from 'react';

const socket = io('http://localhost:3001');

export default function Homepage() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const {
    roomInfo,
    initInfo,
    setRoomInfo,
    toggleCreateModal,
    toggleJoinModal,
    setEnteredUserName,
    setEnteredRoomCode,
    setIsSendingToServer,
    setJoinStatus,
    setCreateStatus,
    setIsInWaitingRoom,
    setUsers,
  } = useRoomStore();

  useEffect(() => {
    socket.on('room-created', (data) => {
      console.log('Room created:', data);
      setRoomInfo({
        roomOwner: data.infoFromValues.roomOwner,
        roomName: data.infoFromValues.roomName,
        roomCode: data.infoFromValues.roomCode,
        restaurantOption: data.infoFromValues.restaurantOption,
        users: data.infoFromValues.users,
      });
      setIsInWaitingRoom(true);
    });

    socket.on('room-exists', (data) => {
      setCreateStatus(
        `Room with code ${data} already exists. Please try again with a different code`
      );
      setIsSendingToServer(false);
    });

    socket.on('room-not-found', (data) => {
      setJoinStatus(
        `Room with code ${data} not found. Please try again with a different code`
      );
      setIsSendingToServer(false);
    });

    socket.on('room-locked', (data) => {
      setJoinStatus(
        `Room with code ${data} is locked. Please try again with a different code`
      );
      setIsSendingToServer(false);
    });

    return () => {
      socket.off('room-created');
      socket.off('room-exists');
      socket.off('room-joined');
      socket.off('room-not-found');
      socket.off('room-locked');
    };
  }, [
    setCreateStatus,
    setIsInWaitingRoom,
    setJoinStatus,
    setRoomInfo,
    setUsers,
    roomInfo,
    setIsSendingToServer,
  ]);
  const createRoomForm = () => {
    return (
      <div className="mx-4">
        <Formik
          initialValues={{
            userName: 'Irene',
            roomName: "ReVeluv's Room",
            roomCode: '20140801',
         }}
          validationSchema={Yup.object({
            userName: Yup.string().required('Please enter a username'),
            roomName: Yup.string()
              .required('Please enter a room name')
              .min(5, 'Room name must be at least 5 characters long')
              .max(20, 'Room name must be at most 20 characters long'),
            roomCode: Yup.string()
              .required('Required')
              .matches(/^[0-9]{8}$/, {
                message:
                  'Room code must be exactly 8 digits long, no letters allowed',
              }),
  
          })}
          onSubmit={(values) => createRoom(values)}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="userName"
                  className="font-semibold text-sm text-bright_plum-700 underline underline-offset-4"
                >
                  Enter a name for yourself
                </label>
                <Field
                  id="userName"
                  placeholder="Bae Joo-hyun"
                  type="text"
                  name="userName"
                  className="p-2 border rounded-md bg-white-950 py-2 text-sm"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-bright_plum-400 text-sm"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="roomName"
                  className="font-semibold text-sm text-strawberry_milkshake-700 underline underline-offset-4"
                >
                  Room Name
                </label>
                <Field
                  id="roomName"
                  placeholder="eg. ReVeluv's Room"
                  type="text"
                  name="roomName"
                  className="p-2 border rounded-md bg-white-950 py-2 text-sm"
                />
                <ErrorMessage
                  name="roomName"
                  component="div"
                  className="text-strawberry_milkshake-400 text-sm"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="roomCode"
                  className="font-semibold text-sm text-citrus_blush-700 underline underline-offset-4"
                >
                  Room Code
                </label>
                <Field
                  id="roomCode"
                  placeholder="eg. 20140801 "
                  type="text"
                  name="roomCode"
                  className="p-2 border rounded-md bg-white-950 py-2 text-sm"
                />
                <ErrorMessage
                  name="roomCode"
                  component="div"
                  className="text-citrus_blush-400 text-sm"
                />
              </div>
              
              <button
                className="w-full bg-black-300 hover:bg-black-400 shadow-md py-2 rounded-md text-white-950 text-md font-semibold"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Room...' : 'Create Room'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  };

  const createRoom = async (values: {
    userName: string;
    roomName: string;
    roomCode: string;

  }) => {
    setIsSendingToServer(true);
    setCreateStatus('Creating room...');
    const { userName, roomName, roomCode} = values;

    const infoFromValues = {
      roomOwner: userName,
      roomName,
      roomCode,
      users: [
        {
          userName: userName,
          socketId: socket.id,
          isOwner: true,
        },
      ],
    };

    setEnteredUserName(userName);
    setEnteredRoomCode(roomCode);

    if (socket.connected) {
      socket.emit('create-room', { infoFromValues });
    } else {
      setCreateStatus('Server is down. Please try again later');
    }
    setIsSendingToServer(false);
  };

  const joinRoom = (roomCode: string) => {
    if (socket.connected) {
      setIsSendingToServer(true);
      setJoinStatus('Joining room...');
      setEnteredUserName(initInfo.enteredUserName);
      setEnteredRoomCode(roomCode);
      socket.emit('join-room', {
        username: initInfo.enteredUserName,
        code: roomCode,
      });
      setIsInWaitingRoom(true);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-full bg-black-400 ">
      <section
        className=" bg-gradient-to-t 
    from-citrus_blush-800
    to-bright_plum-800 w-full rounded-b-xl flex items-center justify-center "
      >
        {initInfo.isInWaitingRoom ? (
          <WaitingRoom socket={socket} />
        ) : (
          <div className="px-4 py-12 xl:px-12 max-w-3xl w-full ">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight  sm:text-5xl lg:text-6xl">
                Create a Room
              </h1>
              <p className="text-md ">
                Create a new room to start deciding on what to eat with friends
                and family.
              </p>
              <div className="flex flex-col gap-2">
                {isDesktop ? (
                  <Dialog
                    open={initInfo.isCreateModalOpen}
                    onOpenChange={toggleCreateModal}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className={`bg-black-400 border-0 text-white-950 font-semibold text-md`}
                      >
                        Create a Room
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create a new room</DialogTitle>
                        <DialogDescription>
                          Create a new room for your friends to join!
                        </DialogDescription>
                        {initInfo.createStatus && (
                          <div className="bg-gradient-to-t from-citrus_blush-800 to-bright_plum-800 p-2 rounded-md mx-auto">
                            <p className="text-sm text-black-300 font-semibold text-center">
                              {initInfo.createStatus}
                            </p>
                          </div>
                        )}
                        {createRoomForm()}
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Drawer open={initInfo.isCreateModalOpen}>
                    <DrawerTrigger
                      asChild
                      onClick={() => {
                        toggleCreateModal();
                      }}
                    >
                      <Button
                        variant="outline"
                        className={`bg-black-400 border-0 text-white-950 font-semibold text-md`}
                      >
                        Create a Room
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader className="text-left">
                        <DrawerTitle>Create a new room</DrawerTitle>
                        <DrawerDescription>
                          Create a new room for your friends to join!
                        </DrawerDescription>
                      </DrawerHeader>
                      {initInfo.createStatus && (
                        <div className="bg-gradient-to-t from-citrus_blush-800 to-bright_plum-800 p-2 rounded-md mx-auto">
                          <p className="text-sm text-black-300 font-semibold text-center">
                            {initInfo.createStatus}
                          </p>
                        </div>
                      )}
                      {createRoomForm()}
                      <DrawerFooter className="pt-2">
                        <DrawerClose
                          asChild
                          onClick={() => {
                            toggleCreateModal();
                          }}
                        >
                          <Button
                            variant="outline"
                            className="bg-gradient-to-t from-citrus_blush-800 to-bright_plum-800 text-black-500 font-semibold py-3"
                          >
                            Cancel
                          </Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                )}

                <p
                  className="underline min-w-fit cursor-pointer"
                  onClick={() => toggleJoinModal()}
                >
                  or join an existing room
                </p>
              </div>

              <div>
                {initInfo.isJoinModalOpen && (
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-white-950 p-5 rounded-lg w-full flex justify-center flex-col items-center space-y-4">
                      <div className="w-full space-y-2">
                        <Label htmlFor="joinUsername">Enter your name</Label>
                        <input
                          id="joinUsername"
                          placeholder="eg. Wendy"
                          className="p-2 border rounded-md bg-white-450 py-2 text-sm w-full"
                          type="text"
                          value={initInfo.enteredUserName}
                          onChange={(e) => setEnteredUserName(e.target.value)}
                        />
                      </div>
                      <h3 className="text-center">
                        Enter the 8-digit code provided by the room owner to
                        join the room.
                      </h3>
                      <InputOTP
                        maxLength={8}
                        className="border-red-100 "
                        value={initInfo.enteredRoomCode}
                        onChange={(value) => setEnteredRoomCode(value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={0}
                            className={`border-black-800 text-lg text-${getRandomColor()}`}
                          />
                          <InputOTPSlot
                            index={1}
                            className={`border-black-800 text-lg text-${getRandomColor()}`}
                          />
                          <InputOTPSlot
                            index={2}
                            className={`border-black-800 text-lg text-${getRandomColor()}`}
                          />
                          <InputOTPSlot
                            index={3}
                            className={`border-black-800 text-lg text-${getRandomColor()}`}
                          />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={4}
                            className={`border-black-800 text-lg text-${getRandomColor()}`}
                          />
                          <InputOTPSlot
                            index={5}
                            className={`border-black-800 text-lg text-${getRandomColor()}`}
                          />
                          <InputOTPSlot
                            index={6}
                            className={`border-black-800 text-lg text-${getRandomColor()}`}
                          />
                          <InputOTPSlot
                            index={7}
                            className={`border-black-800 text-lg text-${getRandomColor()}`}
                          />
                        </InputOTPGroup>
                      </InputOTP>
                      <div className="text-citrus_blush-400 text-sm">
                        {initInfo.joinStatus}
                      </div>
                    </div>
                    <Button
                      className="w-full bg-black-300 hover:bg-black-400 shadow-md "
                      type="submit"
                      disabled={initInfo.isSendingToServer}
                      onClick={() => joinRoom(initInfo.enteredRoomCode)}
                    >
                      Join Room
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="flex-grow flex items-center justify-center">
        {initInfo.isInWaitingRoom ? (
          <Gameplay socket={socket} />
        ) : (
          <GameRules />
        )}
      </section>
    </main>
  );
}
