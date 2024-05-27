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
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import GameRules from '@/components/rules';
import { getRandomColor } from '@/lib/utils';
import WaitingRoom from '@/components/waitingRoom';
import Gameplay from '@/components/gameplay';

const socket = io('http://localhost:3001');

export type Guest = {
  username: string;
  id: string;
};
export type RoomUsers = {
  owner: string;
  users: Guest[];
};

export default function Homepage() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isJoinMenuOpen, setIsJoinMenuOpen] = useState(false);
  const [open, setOpen] = useState(false); // tracks if the dialog/drawer is open
  const [value, setValue] = useState(''); // tracks value of the join room code input
  const [username, setUsername] = useState(''); // tracks current user's username
  const [roomInfo, setRoomInfo] = useState<{
    owner: string;
    name: string;
    code: string;
  } | null>(null); // tracks the current room's info
  const [isSubmitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(''); // tracks the status of the room creation
  const [joinUsername, setJoinUsername] = useState('Wendy'); // tracks the username of the users joining the room
  const [joinStatus, setJoinStatus] = useState('');
  const [roomUsers, setRoomUsers] = useState<RoomUsers | null>(null);

  useEffect(() => {
    socket.on(
      'room-created',
      (roomInfo: {
        details: {
          name: string;
          owner: string;
          code: string;
        };
        usersInRoom: {
          owner: string;
          users: Guest[];
        };
      }) => {
        setRoomInfo({
          owner: roomInfo.details.owner,
          name: roomInfo.details.name,
          code: value,
        });
        setRoomUsers({
          owner: roomInfo.details.owner,
          users: roomInfo.usersInRoom.users,
        });
        setSubmitting(false);
      }
    );
    socket.on('room-exists', (code) => {
      setStatus(`Room with code ${code} already exists.`);
      setSubmitting(false);
    });

    socket.on(
      'room-joined',
      (roomInfo: {
        details: {
          name: string;
          owner: string;
          code: string;
        };
        usersInRoom: {
          owner: string;
          users: Guest[];
        };
      }) => {
        setRoomInfo({
          owner: roomInfo.details.owner,
          name: roomInfo.details.name,
          code: roomInfo.details.code,
        });
        setRoomUsers({
          owner: roomInfo.details.owner,
          users: roomInfo.usersInRoom.users,
        });
        setJoinStatus('');
        setSubmitting(false);
      }
    );

    socket.on('room-locked', (message: string) => {
      setJoinStatus(message);
      setSubmitting(false);
    
    })

    socket.on('room-not-found', (code) => {
      setJoinStatus(`Room with code ${code} not found.`);
      setSubmitting(false);
    });
  });

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
            // .test('is-unique', 'Room code already taken', async (value) => {
            //   const response = await fetch(`http://localhost:3001/rooms/${value}`);
            //   const data = await response.json();
            //   return data.length === 0;
            // })
          })}
          onSubmit={(values) => createRoom(values)}
        >
          <Form className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="userName"
                className="font-semibold text-sm text-bright_plum-700 underline underline-offset-4"
              >
                Enter a name for yourself
              </Label>
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
                className="text-bright_plum-400 text-sm "
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="roomName"
                className="font-semibold text-sm text-strawberry_milkshake-700 underline underline-offset-4"
              >
                Room Name
              </Label>
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
                className="text-strawberry_milkshake-400 text-sm "
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="roomCode"
                className="font-semibold text-sm text-citrus_blush-700 underline underline-offset-4"
              >
                Room Code
              </Label>
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
                className="text-citrus_blush-400 text-sm "
              />
            </div>
            <Button
              className="w-full bg-black-300 hover:bg-black-400 shadow-md "
              type="submit"
            >
              {isSubmitting ? 'Creating Room...' : 'Create Room'}
            </Button>
          </Form>
        </Formik>
      </div>
    );
  };

  const createRoom = (values: {
    userName: string;
    roomName: string;
    roomCode: string;
  }) => {
    {
      /*
          Logic to create a room goes here:
          - format values to be sent to the server to make a new room
          - send values to the server
          - server will create a new room and send back a response
          - if successful, user will join the room and the roomInfo will be saved in the state
          - if not, show an error message
       */
    }
    setSubmitting(true);
    const { userName, roomName, roomCode } = values;
    const roomInfo = {
      owner: userName,
      name: roomName,
      code: roomCode,
    };
    if (socket.connected) {
      socket.emit('create-room', roomInfo);
      setUsername(userName);
      setValue(roomCode);
    } else {
      setStatus(
        `Socket is not connected, server is down. Please try again later.`
      );
      setSubmitting(false);
    }
  };
  const joinRoom = (roomCode: string) => {
    if (socket.connected) {
      socket.emit('join-room', { username: joinUsername, code: roomCode });
      setUsername(joinUsername);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-full bg-black-400 ">
      <section
        className=" bg-gradient-to-t 
    from-citrus_blush-800
    to-bright_plum-800 w-full rounded-b-xl flex items-center justify-center "
      >
        {roomInfo ? (
          <WaitingRoom
            roomInfo={roomInfo}
            username={username}
            socket={socket}
            roomUsers={roomUsers}
            setRoomUsers={setRoomUsers}
          />
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
                  <Dialog open={open} onOpenChange={setOpen}>
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
                        {status && (
                          <div
                            className="bg-gradient-to-t 
    from-citrus_blush-800
    to-bright_plum-800 p-2 rounded-md"
                          >
                            <p className="text-sm text-black-300 font-semibold">
                              {status}
                            </p>
                          </div>
                        )}
                        {createRoomForm()}
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                      <Button
                        variant="outline"
                        className={`bg-black-400 border-0 text-white-950 font-semibold text-md `}
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
                      {status && (
                        <div
                          className="bg-gradient-to-t 
    from-citrus_blush-800
    to-bright_plum-800 p-2 rounded-md"
                        >
                          <p className="text-sm text-black-300 font-semibold">
                            {status}
                          </p>
                        </div>
                      )}

                      {createRoomForm()}

                      <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                          <Button
                            variant="outline"
                            className="bg-gradient-to-t from-citrus_blush-800 to-bright_plum-800 text-black-500 font-semibold"
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
                  onClick={() => setIsJoinMenuOpen(true)}
                >
                  or join an existing room
                </p>
              </div>

              <div>
                {isJoinMenuOpen && (
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-white-950 p-5 rounded-lg w-full flex justify-center flex-col items-center space-y-4">
                      <div className="w-full space-y-2">
                        <Label htmlFor="joinUsername">Enter your name</Label>
                        <input
                          id="joinUsername"
                          placeholder="eg. Wendy"
                          className="p-2 border rounded-md bg-white-450 py-2 text-sm w-full"
                          type="text"
                          value={joinUsername}
                          onChange={(e) => setJoinUsername(e.target.value)}
                        />
                      </div>
                      <h3 className="text-center">
                        Enter the 8-digit code provided by the room owner to
                        join the room.
                      </h3>
                      <InputOTP
                        maxLength={8}
                        className="border-red-100 "
                        value={value}
                        onChange={(value) => setValue(value)}
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
                        {joinStatus}
                      </div>
                    </div>
                    <Button
                      className="w-full bg-black-300 hover:bg-black-400 shadow-md "
                      type="submit"
                      onClick={() => joinRoom(value)}
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
      <section className='flex-grow flex items-center justify-center'>{roomInfo ? <Gameplay /> : <GameRules />}</section>
    </main>
  );
}
