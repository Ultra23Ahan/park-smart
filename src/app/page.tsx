'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Clock, Nfc, MapPin, ShieldCheck, Zap, Leaf } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import React from 'react';
import Image from 'next/image';
import ColourfulText from '@/components/ui/colourful-text';
import Header from '@/components/layout/header';

const features = [
  {
    icon: <Nfc className="h-8 w-8 text-primary" />,
    title: '1. Book & Check-in',
    description:
      'Secure your parking spot in advance. Tap your phone or use your number plate for instant, seamless access.',
    img: 'https://placehold.co/600x400.png',
    imgHint: 'parking technology',
  },
  {
    icon: <MapPin className="h-8 w-8 text-primary" />,
    title: '2. Live Guidance',
    description:
      'No more searching. Get a live map on your phone that directs you precisely to your assigned spot.',
    img: 'https://placehold.co/600x400.png',
    imgHint: 'map navigation',
  },
  {
    icon: <Car className="h-8 w-8 text-primary" />,
    title: '3. Drive & Go',
    description:
      "The system handles payments automatically based on your stay. Just drive out when you're done.",
    img: 'https://placehold.co/600x400.png',
    imgHint: 'car leaving',
  },
];

const benefits = [
  {
    icon: <Clock />,
    title: 'Time-Saving',
    description: 'Cut your parking time from minutes to seconds.',
  },
  {
    icon: <ShieldCheck />,
    title: 'Secure',
    description: 'Automated tracking and secure payments.',
  },
  {
    icon: <Zap />,
    title: 'Effortless',
    description: 'No tickets, no cash, no hassle.',
  },
  {
    icon: <Leaf />,
    title: 'Eco-Friendly',
    description: 'Reduced circling means a smaller carbon footprint.',
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48 text-center relative overflow-hidden">
            <div className="w-screen px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="grid gap-6 lg:grid-cols-1 lg:gap-12 xl:grid-cols-1">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex flex-row items-center justify-center w-fit mx-auto gap-1">
                    {/* <div className="bg-primary/35 w-16 h-16 p-2 rounded-full flex items-center justify-center"> */}
                      <Car className="mx-auto h-14 w-14 text-primary" />
                    {/* </div> */}
                    <p className="text-4xl font-bold tracking-tight mt-1">
                      ParkSmart
                    </p>
                  </div>
                  <div className="space-y-2">
                    <ColourfulText
                      text="Smart"
                      className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl inline-block"
                    />
                    <p className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl inline-block">
                      &nbsp;Parking. &nbsp;
                    </p>

                    <ColourfulText
                      text="Seamless"
                      className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl inline-block"
                    />
                    <p className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl inline-block">
                      &nbsp;Experience.
                    </p>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                      Welcome to ParkSmart, the future of urban mobility.
                      Pre-book your spot, get live guidance, and manage
                      everything in one place.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-primary/90 hover:bg-primary">
                      <Link href="/pre-book">Pre-Book Now</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="features" className="w-full py-12 md:py-24 lg:py-32">
            <div className="w-screen px-10">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                    How It Works
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    A Revolution in Parking
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our system simplifies your parking experience from start to
                    finish.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-none mt-12 px-24">
                {features.map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}>
                    <Card className="grid gap-1 text-left p-0 rounded-lg transition-all hover:shadow-xl hover:-translate-y-2 overflow-hidden bg-card/50 backdrop-blur-sm h-full">
                      <Image
                        src={feature.img}
                        alt={feature.title}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                        data-ai-hint={feature.imgHint}
                      />
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            {feature.icon}
                          </div>
                          <CardTitle className="text-xl font-bold">
                            {feature.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
            <div className="w-full px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Why ParkSmart?
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We&apos;re not just parking cars, we&apos;re building
                    smarter, more efficient cities.
                  </p>
                </div>
              </div>
              <div className="relative mt-12">
                <div className="absolute inset-0.5 rounded-xl bg-primary/20 blur-xl animate-pulse"></div>
                <div className="relative mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-8 rounded-xl bg-card/60 backdrop-blur-sm border">
                  {benefits.map((benefit, i) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 px-8">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {React.cloneElement(benefit.icon, {
                          className: 'h-6 w-6',
                        })}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 border-t">
            <div className="w-full grid items-center justify-center gap-4 px-4 text-center md:px-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Experience the Future of Parking?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who are enjoying a smarter, simpler
                  parking experience.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Button asChild size="lg" className="w-full">
                  <Link href="/pre-book">Book Your Spot</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
