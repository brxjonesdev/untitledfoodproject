/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useGameplayStore from '@/stores/useGameplayStore';
import useRoomStore from '@/stores/useInitRoomStore';

export default function PhaseOne({ socket }: { socket: any }) {
  const {setPhase } = useGameplayStore();
  const { roomInfo, initInfo } = useRoomStore();
  const isHost = roomInfo.roomOwner === initInfo.enteredUserName;

  useEffect(() => {
    // lets page stay open for 3 seconds then moves to next phase
    console.log('waiting for 3 seconds then moving to next phase');

    if (!isHost) {
      setPhase('Phase_Two');
      return;
    }

    const phaseTimer = setTimeout(() => {
      setPhase('Phase_Two');
      socket.emit('start-voting', roomInfo.roomCode);
    }, 3000);

    return () => {
      console.log('clearing timeout');
      clearTimeout(phaseTimer);
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center space-y-4 text-center bg-white-950 p-4 rounded-lg shadow-lg my-auto"
    >
      {isHost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <button
            onClick={() => {
              socket.emit('start-voting', roomInfo.roomCode);
              setPhase('Phase_Two');
            }}
            className="px-4 py-2 bg-strawberry_milkshake-700 hover:bg-strawberry_milkshake-600 text-white rounded-lg w-full font-semibold"
          >
            Start Voting?
          </button>

          <div>
            <h3>Order of Voting:</h3>
            <ul>
              {roomInfo.users.map((user: any) => (
                <li key={user.socketId}>{user.userName}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
      {!isHost && (
        <motion.div className="flex flex-col">
          <h2>{`${roomInfo.roomOwner} is the host`}</h2>
          <p>{`Waiting for ${roomInfo.roomOwner} to start the vote`}</p>
          <div>
            <h3>Order of Voting:</h3>
            <ul>
              {roomInfo.users.map((user: any) => (
                <li key={user.socketId}>{user.userName}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}
