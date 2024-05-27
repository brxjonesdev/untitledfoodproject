import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useEffect, useState } from 'react';
import { RoomUsers, Guest } from '@/pages/home_page';
import { Toggle } from "@/components/ui/toggle"
import lock from "@/assets/lock.svg"


type WaitingRoomProps = {
  roomInfo: {
    owner: string;
    name: string;
    code: string;
  };
  setRoomUsers: React.Dispatch<React.SetStateAction<RoomUsers | null>>;
  roomUsers: RoomUsers | null;
  username: string;
  socket: any;
};

const WaitingRoom = ({
  roomInfo,
  roomUsers,
  setRoomUsers,
  username,
  socket,
}: WaitingRoomProps) => {
  const isHost = roomInfo.owner === username;
  const [isLocked, setIsLocked] = useState(false);
  const [showStartGame, setShowStartGame] = useState(true);

  useEffect(() => {
    socket.on(
      'user-joined',
      (data: {
        usersInRoom: {
          owner: string;
          users: Guest[];
        };
      }) => {
        setRoomUsers({
          owner: data.usersInRoom.owner,
          users: data.usersInRoom.users,
        });
      }
    );
    socket.on(
      'user-left',
      (data: {
        username: string;
        usersInRoom: {
          owner: string;
          users: Guest[];
        };
      }) => {
        setRoomUsers({
          owner: data.usersInRoom.owner,
          users: data.usersInRoom.users,
        });
      }
    );
    socket.on('room-locked-toggled', (isLocked : boolean) => {
      setIsLocked(isLocked);
    });
  
    return () => {
      socket.off('user-joined');
      socket.off('user-left');
      socket.off('room-locked-toggled');
    };
  });
  console.log(roomInfo)

  return (
    <Card className="rounded-none rounded-b-xl w-full">
      <CardHeader className="pb-0">
        <CardTitle>
          <div className='flex gap-8 items-center'>
          {roomInfo.name}
          {isHost && (
            <Toggle
            pressed={isLocked}
             onClick={() => {
              socket.emit('toggle-room-lock', roomInfo.code);
             }}
            >
              <img src={lock} alt="lock" />
            </Toggle>
          )}
          </div>
          </CardTitle>
        <CardDescription>
          {isHost ? (
            <div>
              <p>
                Room Code: <span className="font-bold">{roomInfo.code}</span>
              </p>
              <span className="font-bold">You are the host</span>
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="font-bold">{`${roomInfo.owner} is the host`}</span>
              <span className="font-bold">You are {username}</span>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-4"
        >
          {roomUsers && roomUsers.users.length > 0 && (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <h1 className="text-xl font-bold tracking-tighter sm:text-5xl">
                    Users Joined ({roomUsers.users.length})
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <motion.div className="grid grid-cols-5 gap-3">
                    {/* <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`flex items-center justify-center min-w-fit bg-strawberry_milkshake-600 text-white-950 py-1 font-semibold rounded-lg px-2 text-sm`}
                    >
                      {roomUsers.owner}
                    </motion.p> */}
                    {roomUsers.users.map((user, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`flex items-center justify-center min-w-fit bg-bright_plum-600 text-white-950 py-1 font-semibold rounded-lg px-2 text-sm`}
                      >
                        {user.username}
                      </motion.div>
                    ))}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </motion.div>
      </CardContent>
      <CardFooter>
        {/* 
        This button should only be visible to the host 
        and should be disabled if there isnt 
        another player in the room that is not the host.
         */}
        {isHost && roomUsers && roomUsers.users.length > 1 && showStartGame && (
          <button
            className="w-full bg-bright_plum-600 text-white-950 py-2 font-semibold rounded-lg hover:bg-bright_plum-700 transition-colors duration-300"
            onClick={() => {
              socket.emit('start-game', roomInfo.code);
              setShowStartGame(false);
            }}
          >
            Start Game
          </button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WaitingRoom;
