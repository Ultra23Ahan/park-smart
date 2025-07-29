import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Clock, RefreshCw } from 'lucide-react';
import Image from 'next/image';

export default async function GuidancePage({
  params,
}: {
  params: { vehicleId: string };
}) {
  const { vehicleId } = await params;

  return (
    <div className="w-screen py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">
              Live Guidance for{' '}
              <span className="text-primary">
                {decodeURIComponent(vehicleId)}
              </span>
            </CardTitle>
            <CardDescription>
              Your assigned parking spot is{' '}
              <span className="text-accent font-bold">A-07</span>. Follow the
              highlighted route.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full aspect-video rounded-lg overflow-hidden relative border bg-muted">
              <Image
                src="https://placehold.co/800x450.png"
                alt="Parking Lot Map"
                data-ai-hint="parking lot map"
                width={800}
                height={450}
                className='object-cover'
              />
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 800 450">
                {/* User location dot */}
                <circle
                  cx="100"
                  cy="400"
                  r="10"
                  fill="hsl(var(--primary))"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle
                  cx="100"
                  cy="400"
                  r="15"
                  fill="hsl(var(--primary))"
                  opacity="0.3"
                  className="animate-ping"
                />

                {/* Path */}
                <path
                  d="M 100 400 Q 150 200, 400 220 T 650 100"
                  stroke="hsl(var(--primary))"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="15 10"
                  strokeLinecap="round">
                  <animate
                    attributeName="stroke-dashoffset"
                    from="1000"
                    to="0"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </path>

                {/* Assigned Spot */}
                <rect
                  x="620"
                  y="70"
                  width="60"
                  height="60"
                  fill="hsl(var(--accent))"
                  stroke="white"
                  strokeWidth="3"
                  rx="8"
                  opacity="0.8"
                />
                <text
                  x="650"
                  y="110"
                  fontFamily="sans-serif"
                  fontSize="24"
                  fill="white"
                  textAnchor="middle"
                  fontWeight="bold">
                  A-07
                </text>
              </svg>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button size="lg" variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Rebook a Different Slot
              </Button>
              <Button size="lg">
                <Clock className="mr-2 h-4 w-4" /> Extend Parking Time
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
