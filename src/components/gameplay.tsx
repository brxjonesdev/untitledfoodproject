import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useRoomStore from '@/stores/useInitRoomStore';
import useGameplayStore from '@/stores/useGameplayStore';

export default function Gameplay({ socket }: { socket: any }) {
  const {
    setHasGameStarted,
    initInfo: { hasGameStarted },
  } = useRoomStore();

  const { phase, setPhase } = useGameplayStore();

  useEffect(() => {
    socket.on('game-started', (message: string) => {
      console.log(message);
      setHasGameStarted(true);
      setPhase(message);
      // Open the order randomizer modal
    });
  });

  const renderComponent = () => {
    switch (phase) {
      case 'waitingOnHost':
        return;
      case 'Phase_One':
        return;
      case 'Phase_Two':
        return;
      case 'Phase_Three':
        return;
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
