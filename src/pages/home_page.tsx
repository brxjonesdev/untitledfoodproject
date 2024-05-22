import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { useState } from 'react';
import { useMediaQuery } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const socket = io('http://localhost:3001');

export default function Homepage() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isJoinMenuOpen, setIsJoinMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const colors = [
    'bright_plum-700',
    'strawberry_milkshake-700',
    'citrus_blush-700',
  ];

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }


  const createRoom = () => {
    return (
      <div className="mx-4">
        <Formik
          initialValues={{
            userName: '',
            roomName: '',
            roomCode: '',
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
          onSubmit={(values) => {
            // socket.emit('create-room', values);
            // setSubmitting(true);
            // setOpen(false);

            {
              /*
              Logic to create a room goes here:
              - format values to be sent to the server to make a new room
              - send values to the server
              - server will create a new room and send back a response
              - if successful, redirect to the room page, set Submitting to false, and close the dialog/drawer
              - if not, show an error message
           */
            }

            console.log(values);
          }}
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

  const joinRoom = (code: string | number) => {
    {
      /*
      Logic to join a room goes here:
      - format the code to be sent to the server
        - check if the code is 8 digits long
      - send the code to the server
      - server will check if the room exists and the room's status is not in progress
      - if it does, redirect to the room page
      - if not, show an error message
     */
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-full bg-black-400 ">
      <div
        className=" bg-gradient-to-t 
    from-citrus_blush-800
    to-bright_plum-800 w-full rounded-b-xl flex items-center justify-center "
      >
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
                      {createRoom()}
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

                    {createRoom()}

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
                    <h3 className="text-center">
                      Enter the 8-digit code provided by the room owner to join
                      the room.
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
          <div className="relative w-full h-full bg-periwinkle-2"></div>
        </div>
      </div>
      <div className="px-4 py-12 sm:px-6 lg:px-8 h-full flex-grow flex items-center bg-black-400 w-full justify-center">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Wait, how does this work again?</CardTitle>
              <CardDescription>{`here's the deets <3`}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <Button className="w-full" size="sm">
      Join Room
    </Button> */}
              <ul className="space-y-4 mx-4">
                <li>
                  <h4 className="bg-bright_plum-800 w-fit p-0.5 rounded-lg px-1">
                    &#128640; Start the Vote:
                  </h4>
                  <p className="text-sm">
                    The room owner hits the big &quot;start vote&quot; button.
                    It's go time!
                  </p>
                </li>
                <li>
                  <h4 className="bg-strawberry_milkshake-800 w-fit p-0.5 rounded-lg px-1">
                    &#127922; Random Voting Order:
                  </h4>
                  <p className="text-sm">
                    Who votes first? Let the randomizer decide. No favoritism
                    here!
                  </p>
                </li>
                <li>
                  <h4 className="bg-citrus_blush-800 w-fit p-0.5 rounded-lg px-1">
                    &#127828; Pick and Ban (LoL Style):
                  </h4>
                  <p className="text-sm">
                    Take turns picking or banning food categories. Love sushi?
                    Pick it! Hate veggies? Ban 'em!
                  </p>
                </li>
                <li>
                  <h4 className="bg-strawberry_milkshake-800 w-fit p-0.5 rounded-lg px-1">
                    🏆 Top Three Categories:
                  </h4>
                  <p className="text-sm">
                    The system tallies the votes and picks the top three food
                    categories. Majority rules!
                  </p>
                </li>
                <li>
                  <h4 className="bg-citrus_blush-800 w-fit p-0.5 rounded-lg px-1">
                    📍 Find Restaurants:
                  </h4>
                  <p className="text-sm">
                    Get a list of nearby restaurants serving the chosen top
                    three categories. Convenience is key!
                  </p>
                </li>
                <li>
                  <h4 className="bg-bright_plum-800 w-fit p-0.5 rounded-lg px-1">
                    🍽️ Choose Your Fave:
                  </h4>
                  <p className="text-sm">
                    Each participant picks their preferred restaurant from the
                    list. Choose wisely!
                  </p>
                </li>
                <li>
                  <h4 className="bg-strawberry_milkshake-800 w-fit p-0.5 rounded-lg px-1">
                    &#128077;&#128078; Final Vote:
                  </h4>
                  <p className="text-sm">
                    Vote &quot;yes&quot; or &quot;no&quot; on each restaurant
                    choice. Democracy at its finest!
                  </p>
                </li>
                <li>
                  <h4 className="bg-citrus_blush-800 w-fit p-0.5 rounded-lg px-1">
                    🎉 Winner Announced:
                  </h4>
                  <p className="text-sm">
                    The restaurant with the most "yes" votes wins. Tie? We'll
                    spin a wheel to decide the lucky spot!
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* <div className="px-4 py-12 sm:px-6 lg:px-8 w-full bg-gradient-to-t from-citrus_blush-800 to-bright_plum-800 rounded-t-xl ">
        <div className="max-w-md mx-auto space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black-50 dark:text-gray-50 sm:text-4xl" id='join'>
            Enter a Join Code
          </h2>
          <form className="space-y-4">
            <Input className="w-full" placeholder="Enter join code" type="text" />
            <Button className="w-full bg-black-300 hover:bg-black-400 shadow-md " type="submit">
              Join Room
            </Button>
          </form>
        </div>
      </div> */}
    </main>
  );
}
