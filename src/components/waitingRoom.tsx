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
import { Toggle } from '@/components/ui/toggle';
import lock from '@/assets/lock.svg';
import useRoomStore from '@/stores/useInitRoomStore';
import useGameplayStore from '@/stores/useGameplayStore';
import { useEffect } from 'react';

const WaitingRoom = ({ socket}) => {
  const { roomInfo, initInfo, setUsers, setRoomInfo, } = useRoomStore();
  const { isRoomLocked } = useGameplayStore();
  const isHost = roomInfo.roomOwner === initInfo.enteredUserName;

  useEffect(()=>{

    socket.on("user-joined", (data) => {
      console.log('room-joined', data);
      setRoomInfo({
        roomOwner: data.roomDetails.roomOwner,
        roomName: data.roomDetails.roomName,
        roomCode: initInfo.enteredRoomCode,
        restaurantOption: data.roomDetails.restaurantOption,
        users: data.usersInRoom.users
      })
    
    })
    socket.on("user-left", (data) => {
      console.log('room-left', data);
      setUsers(data.usersInRoom.users)
    })
  }, [socket, setRoomInfo, setUsers, initInfo.enteredRoomCode])

  return (
    <Card className="rounded-none rounded-b-xl w-full">
      <CardHeader className="pb-0">
        <CardTitle>
          <div className="flex gap-8 items-center">
            {roomInfo.roomName}
            {isHost && (
              <Toggle
                pressed={isRoomLocked}
                onClick={() => {
                  socket.emit('toggle-room-lock', roomInfo.roomCode);
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
                Room Code:{' '}
                <span className="font-bold">{roomInfo.roomCode}</span>
              </p>
              <span className="font-bold">You are the host</span>
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="font-bold">{`${roomInfo.roomOwner} is the host`}</span>
              <span className="font-bold">
                You are {initInfo.enteredUserName}
              </span>
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
          {roomInfo.users && roomInfo.users.length > 0 && (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <h1 className="text-xl font-bold tracking-tighter sm:text-5xl">
                    Users Joined ({roomInfo.users.length})
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
                    {roomInfo.users.map((user) => (
                      <motion.div
                        key={user.socketId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`flex items-center justify-center min-w-fit bg-bright_plum-600 text-white-950 py-1 font-semibold rounded-lg px-2 text-sm`}
                      >
                        {user.userName}
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
        {isHost &&
          roomInfo.users &&
          roomInfo.users.length > 1 &&
          !initInfo.hasGameStarted && (
            <button
              className="w-full bg-bright_plum-600 text-white-950 py-2 font-semibold rounded-lg hover:bg-bright_plum-700 transition-colors duration-300"
              onClick={() => {
                socket.emit('start-game', roomInfo.roomCode);
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
