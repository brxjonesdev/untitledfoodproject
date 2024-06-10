import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useRoomStore from '@/stores/useInitRoomStore';
import useGameplayStore from '@/stores/useGameplayStore';
import PhaseOne from './gameplay-phases/phaseOne';
import PhaseTwo from './gameplay-phases/phaseTwo';
import PhaseThree from './gameplay-phases/phaseThree';

{
  /*
  Gameplay: How this works.
  1. Host starts the game
  2. Users are shuffled and sent to the next phase
  3. Each User submits an idea for where to eat ( up to 3 )
  4. Users then vote on all options submitted ( one yes, one no )
*/
}

export default function Gameplay({ socket }: { socket: any }) {
  const {
    setHasGameStarted,
    setUsers,
    initInfo: { hasGameStarted },
  } = useRoomStore();

  const { phase, setPhase } = useGameplayStore();

  useEffect(() => {
    socket.on('game-started', (data) => {
      console.log('game-started', data);
      setUsers(data);
      setHasGameStarted(true);
      setPhase('Phase_One');
      // Open the order randomizer modal
    });

    return () => {
      socket.off('game-started');
    };
  });

  const renderComponent = () => {
    switch (phase) {
      case 'waitingOnHost':
        return (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center bg-white-950 p-4 rounded-lg shadow-lg my-auto mx-4"
        >
          <h1 className="text-xl font-bold tracking-tighter sm:text-3xl">
            Waiting for everyone to make thier vote
          </h1>
        </motion.div>
        );
      case 'Phase_One':
        return <PhaseOne socket={socket} />;
      case 'Phase_Two':
        return <PhaseTwo socket={socket} />;
      case 'Phase_Three':
        return <PhaseThree socket={socket} />;
      default:
        return null;
    }
  };

  return (
    <div className="">
      {hasGameStarted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center bg-white-950 p-4 rounded-lg shadow-lg my-auto"
        >
          {renderComponent()}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center bg-white-950 p-4 rounded-lg shadow-lg my-auto mx-4"
        >
          <h1 className="text-xl font-bold tracking-tighter sm:text-3xl">
            Waiting for host to start
          </h1>
          <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            This is the waiting page. This is where the magic happens.
          </p>
        </motion.div>
      )}
    </div>
  );
}
