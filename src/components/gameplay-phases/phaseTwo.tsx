/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import useGameplayStore from '@/stores/useGameplayStore';
import useRoomStore from '@/stores/useInitRoomStore';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import { Label } from '../ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function PhaseTwo({ socket }: { socket: any }) {
  const { setPhase, setIsVoting, isVoting, setChoices} =
    useGameplayStore();
  const { roomInfo, initInfo } = useRoomStore();

  useEffect(() => {
    socket.on('is-voting', () => {
      console.log('voting');
      setIsVoting(true);
    });

    socket.on('is-not-voting', () => {
      console.log('not voting');
      setIsVoting(false);
    });

    socket.on('votes-revealed', (data :any) => {
        console.log('votes-revealed', data);
        setChoices(data);
        setPhase('Phase_Three');
    })

    return () => {
      socket.off('is-voting');
      socket.off('is-not-voting');
    };
  }, []);


  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center space-y-4 text-center bg-white-950 p-4 rounded-lg shadow-lg my-auto"
    >
      {isVoting === null || isVoting === false ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <p className="font-semibold">Waiting for host to start voting...</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <Formik
            initialValues={{ choice: '' }}
            validationSchema={Yup.object({
              choice: Yup.string().required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setSubmitting(false);
              socket.emit('user-voted', {
                voter: initInfo.enteredUserName,
                roomCode: roomInfo.roomCode,
                choice: values.choice,
              });
              setIsVoting(false);
            }}
          >
            <Card className='w-full'>
              <CardHeader>
                <CardTitle>It's your turn to vote!</CardTitle>
              </CardHeader> 
              <Form>
              <CardContent>
                    <div className="space-y-2">
                        <div className='flex flex-col gap-3'>
                        <Label htmlFor="choice">What's your choice?</Label>
                        <Field as="input" name="choice" list="options" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                        </div>
                       
                        <ErrorMessage name="choice" component="div" className='text-sm text-citrus_blush-700' />
                    </div>
              </CardContent>
              <CardFooter>
                <button
                  type="submit"
                  className="w-full py-2 bg-strawberry_milkshake-700 text-white rounded-lg font-semibold hover:bg-strawberry_milkshake-800 transition-colors focus:outline-none  focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Submit
                </button>
              </CardFooter>
              </Form>
            </Card>
          </Formik>
        </motion.div>
      )}
    </motion.section>
  );
}
