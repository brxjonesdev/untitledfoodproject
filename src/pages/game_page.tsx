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
import { useState } from 'react';

export default function GamePage() {
  {
    /* 
    Once a room is made or joined, users will be sent here.
    To prevent users from accessing this page without a room, we need to check if thier is a room code in the URL.
    If there is no room code, we will redirect the user to the homepage or show an error page. idk yet.
    If there is a room code, we will check if the room code is valid.
    If the room code is valid, we will show the game page.

    We should get the roomcode and username from the URL.
*/
  }
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const isHost = true;
  const usersJoined: {
    username: string;
    color: string;
  }[] = [
    // {
    //   username: 'Akira',
    //   color: 'bg-red-500',
    // },
    // {
    //   username: 'Leila',
    //   color: 'bg-blue-500',
    // },
    // {
    //   username: 'Mateo',
    //   color: 'bg-green-500',
    // },
    // {
    //   username: 'Aarav',
    //   color: 'bg-yellow-500',
    // },
    // {
    //   username: 'Mei',
    //   color: 'bg-purple-500',
    // },
    // {
    //   username: 'Carlos',
    //   color: 'bg-pink-500',
    // },
    // {
    //   username: 'Fatima',
    //   color: 'bg-orange-500',
    // },
    // {
    //   username: 'Sofia',
    //   color: 'bg-indigo-500',
    // },
    // {
    //   username: 'Yuki',
    //   color: 'bg-gray-500',
    // },
    // {
    //   username: 'Ahmed',
    //   color: 'bg-lime-500',
    // },
  ];

  return (
    <main className="flex flex-col min-h-[100dvh] bg-black-100 w-full">
      <Card className="rounded-none rounded-b-xl">
        <CardHeader className="pb-0">
          <CardTitle>Room Name</CardTitle>
          <CardDescription>
            Room Code: <span className="font-bold">12345678</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-4"
          >
            {usersJoined.length > 0 && (
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <h1 className="text-xl font-bold tracking-tighter sm:text-5xl">
                      Users Joined ({usersJoined.length})
                    </h1>
                  </AccordionTrigger>
                  <AccordionContent>
                    <motion.div className="grid grid-cols-5 gap-3 ">
                      {usersJoined.map((user, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className={`flex items-center justify-center min-w-fit rounded-lg ${user.color} px-2 text-sm `}
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
          {/* If the user is the host and users is above 2, show the start game button */}
          {isHost && usersJoined.length > 2 && (
            <button className="w-full py-2 bg-black-100 rounded-lg text-md font-semibold hover:shadow-lg text-white-950 hover:bg-black-700">
              Start Game
            </button>
          )}
        </CardFooter>
      </Card>

      {/* If the game has started, show the game page */}
      {hasGameStarted && (
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
      )}
      {/* If the game has not started, show the waiting page */}
      {!hasGameStarted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center bg-white-950 p-4 rounded-lg shadow-lg my-auto mx-4"
        >
          <h1 className="text-xl font-bold tracking-tighter sm:text-3xl">
            Waiting for host to start the game
          </h1>
          <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            This is the waiting page. This is where the magic happens.
          </p>
        </motion.div>
      )}
    </main>
  );
}
