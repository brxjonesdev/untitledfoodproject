import { motion } from 'framer-motion';

export default function Gameplay() {
  const hasGameStarted = false;

  return (
    <div className="">
      {hasGameStarted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center bg-white-950 p-4 rounded-lg shadow-lg my-auto"
        >
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Game Page
          </h1>
          <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            This is the game page. This is where the magic happens.
          </p>
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
