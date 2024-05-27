import { RoomUsers } from '@/pages/home_page';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PhaseOne from './gameplay-phases/phaseOne';

export default function Gameplay({socket, roomUsers}: {socket: any, roomUsers: RoomUsers | null}) {
  const [hasGameStarted, setIsGameStarted] = useState(false)
  const [phase, setPhase] = useState('')
  useEffect(()=> {
    socket.on('game-started', (message: string)=> {
      console.log(message)
      setIsGameStarted(true)
      setPhase(message)
      // Open the order randomizer modal
    })
  })

  const renderComponent = () => {
    switch (phase) {
      case 'waitingOnHost':
        return;
      case 'Phase_One':
        return <PhaseOne
        roomUsers={roomUsers}/> ;
      case 'Phase_Two':
        return ;
      case 'Phase_Three':
        return ;
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
