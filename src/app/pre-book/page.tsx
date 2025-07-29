"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addDays, format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Car, Clock, IndianRupee, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const bookingFormSchema = z.object({
  vehicleNumber: z.string().min(4, "Vehicle number must be at least 4 characters."),
  location: z.string({ required_error: "Please select a parking location." }),
  date: z.date({ required_error: "A date for booking is required." }),
  duration: z.number().min(1).max(12),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const defaultValues: Partial<BookingFormValues> = {
  duration: 2,
};

export default function PreBookPage() {
  const { toast } = useToast();
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues,
  });
  const [duration, setDuration] = React.useState(defaultValues.duration || 2);
  const pricePerHour = 50;

  function onSubmit(data: BookingFormValues) {
    toast({
      title: "Booking Successful!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      variant: "default",
    });
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">Pre-Book Your Spot</CardTitle>
            <CardDescription>Fill in the details below to secure your parking slot.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a parking lot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="lot-a">Downtown Parking Lot A</SelectItem>
                            <SelectItem value="lot-b">Uptown Shopping Mall</SelectItem>
                            <SelectItem value="lot-c">Airport Parking Complex</SelectItem>
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
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
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
                                date < new Date(new Date().setHours(0,0,0,0)) || date > addDays(new Date(), 30)
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
                  <Button type="submit" className="w-full" size="lg">Book Now</Button>
                </form>
              </Form>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Live Availability</h3>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-accent font-bold text-xl">17 Slots Available</p>
                    <p className="text-sm text-muted-foreground">In your selected location.</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Duration</span>
                        <span>{duration} Hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Price / Hour</span>
                        <span><IndianRupee className="inline h-4 w-4" /> {pricePerHour.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-4 flex justify-between items-center font-bold text-lg">
                        <span>Total Cost</span>
                        <span className="text-primary"><IndianRupee className="inline h-5 w-5" /> {(duration * pricePerHour).toFixed(2)}</span>
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
