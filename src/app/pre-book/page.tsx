'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { addDays, format } from 'date-fns';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, IndianRupee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const bookingFormSchema = z.object({
  vehicleNumber: z
    .string()
    .regex(
      /^([A-Z][A-Z]) ([0-9][0-9]) ([A-Z][A-Z]) ([0-9][0-9][0-9][0-9])$|^([0-9][0-9]) BH ([0-9][0-9][0-9][0-9]) ([ABCDEFGHJKLMNPQRSTUVWXYZ][ABCDEFGHJKLMNPQRSTUVWXYZ])$/,
      'Sorry, please enter a valid vehicle plate number and try again.'
    ),
  location: z.string({ required_error: 'Please select a parking location.' }),
  date: z.date({ required_error: 'A date for booking is required.' }),
  duration: z.number().min(1).max(12),
  phoneNumber: z.coerce
    .number()
    .min(0, 'Please enter a valid phone number.')
    .max(9999999999, 'Please enter a valid phone number.'),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const defaultValues: BookingFormValues = {
  vehicleNumber: '',
  location: '',
  date: new Date(),
  duration: 2,
  phoneNumber: 0,
};

// Firebase config from .env.local
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
  authDomain: 'npse-f7de0.firebaseapp.com',
  projectId: 'npse-f7de0',
  storageBucket: 'npse-f7de0.firebasestorage.app',
  messagingSenderId: '223267819038',
  appId: '1:223267819038:web:23e0efd75b6328cf33e80f',
  measurementId: 'G-GY2HJ6837G',
} as const;

if (typeof window !== 'undefined' && !getApps().length) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const app = initializeApp(firebaseConfig);
}
const db = typeof window !== 'undefined' ? getFirestore() : null;

export default function PreBookPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues,
  });
  const [duration, setDuration] = React.useState(defaultValues.duration || 2);
  const pricePerHour = 50;

  async function onSubmit(data: BookingFormValues) {
    if (db) {
      try {
        await addDoc(collection(db, 'bookings'), data);
        toast({
          title: 'Booking Successful!',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
          variant: 'default',
        });
      } catch (error) {
        toast({
          title: 'Booking Failed',
          description:
            'There was an error saving your booking. Please try again later.',
          variant: 'destructive',
        });
        console.error(error);
      }
    } else {
      toast({
        title: 'Booking Failed',
        description: 'Firestore not initialized.',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="w-screen py-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Pre-Book Your Spot
            </CardTitle>
            <CardDescription>
              Fill in the details below to secure your parking slot.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8">
                  <FormField
                    control={form.control}
                    name="vehicleNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Number</FormLabel>
                        <FormControl>
                          <Input placeholder="MH 12 AB 1234" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a parking lot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="lot-a">
                              Downtown Parking Lot A
                            </SelectItem>
                            <SelectItem value="lot-b">
                              Uptown Shopping Mall
                            </SelectItem>
                            <SelectItem value="lot-c">
                              Airport Parking Complex
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date & Time</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-accent'
                                )}>
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date <
                                  new Date(new Date().setHours(0, 0, 0, 0)) ||
                                date > addDays(new Date(), 30)
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="9354752015" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration: {duration} hours</FormLabel>
                        <FormControl>
                          <Slider
                            defaultValue={[field.value]}
                            onValueChange={(values) => {
                              field.onChange(values[0]);
                              setDuration(values[0]);
                            }}
                            max={12}
                            step={1}
                            min={1}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      router.push(
                        `/guidance/${form.getValues('phoneNumber').toString()}`
                      );
                    }}>
                    Book Now
                  </Button>
                </form>
              </Form>
              <div className="space-y-6">
                <div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-xl font-semibold mb-1">Note:</p>
                    <p className="text-xl">
                      Your phone number is your booking ID
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Booking Summary
                  </h3>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Duration</span>
                        <span>{duration} Hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Price / Hour
                        </span>
                        <span>
                          <IndianRupee className="inline h-4 w-4" />{' '}
                          {pricePerHour.toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t pt-4 flex justify-between items-center font-bold text-lg">
                        <span>Total Cost</span>
                        <span className="text-primary">
                          <IndianRupee className="inline h-5 w-5" />{' '}
                          {(duration * pricePerHour).toFixed(2)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
