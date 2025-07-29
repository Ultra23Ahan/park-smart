'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  AlertCircle,
  Car,
  IndianRupee,
  ParkingSquare,
  Siren,
} from 'lucide-react';

const occupancyData = [
  { name: '6 AM', occupancy: 15 },
  { name: '9 AM', occupancy: 45 },
  { name: '12 PM', occupancy: 75 },
  { name: '3 PM', occupancy: 60 },
  { name: '6 PM', occupancy: 80 },
  { name: '9 PM', occupancy: 50 },
];
const earningsData = [
  { name: 'Mon', earnings: 4000 },
  { name: 'Tue', earnings: 3000 },
  { name: 'Wed', earnings: 5000 },
  { name: 'Thu', earnings: 4500 },
  { name: 'Fri', earnings: 7000 },
  { name: 'Sat', earnings: 8500 },
  { name: 'Sun', earnings: 9000 },
];

const parkingSlots = Array.from({ length: 24 }, (_, i) => {
  const status_options = ['available', 'occupied', 'blocked'];
  return {
    id: `A-${String(i + 1).padStart(2, '0')}`,
    status: status_options[Math.floor(Math.random() * status_options.length)],
    vehicle:
      Math.random() > 0.5
        ? `MH ${Math.floor(Math.random() * 20)} XY ${Math.floor(
            Math.random() * 10000
          )}`
        : null,
  };
});

const alerts = [
  {
    id: 1,
    type: 'Expired Car',
    message: 'Vehicle MH 14 AB 1111 in slot A-05 has expired.',
    time: '2 mins ago',
  },
  {
    id: 2,
    type: 'Sensor Fault',
    message: 'Sensor for slot B-12 is not responding.',
    time: '15 mins ago',
  },
  {
    id: 3,
    type: 'Payment Failed',
    message: 'Payment failed for vehicle DL 3C Z 9999.',
    time: '1 hour ago',
  },
];

export default function AdminPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <Tabs defaultValue="slots" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="slots">Slot Management</TabsTrigger>
          <TabsTrigger value="occupancy">Live Occupancy</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="earnings">Earnings Report</TabsTrigger>
        </TabsList>

        <TabsContent value="slots" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Slot Management</CardTitle>
              <CardDescription>
                View and manage all parking slots in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {parkingSlots.map((slot) => (
                <Card
                  key={slot.id}
                  className={`p-4 flex flex-col items-center justify-center text-center 
                  ${
                    slot.status === 'occupied' &&
                    'bg-destructive/20 border-destructive/50'
                  } 
                  ${
                    slot.status === 'blocked' &&
                    'bg-muted/80 border-muted-foreground'
                  }
                  ${
                    slot.status === 'available' &&
                    'bg-accent/20 border-accent/50'
                  }
                `}>
                  <p className="font-bold text-lg">{slot.id}</p>
                  <ParkingSquare className="h-8 w-8 my-2" />
                  <Badge
                    variant={
                      slot.status === 'available' ? 'default' : 'secondary'
                    }
                    className={`${
                      slot.status === 'available' &&
                      'bg-accent text-accent-foreground'
                    }`}>
                    {slot.status}
                  </Badge>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="occupancy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Lot Occupancy</CardTitle>
              <CardDescription>
                Occupancy rate over the last 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit="%" />
                  <Bar
                    dataKey="occupancy"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert Dashboard</CardTitle>
              <CardDescription>
                Critical alerts that require immediate attention.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert) => (
                <Alert
                  key={alert.id}
                  variant={
                    alert.type === 'Sensor Fault' ? 'destructive' : 'default'
                  }>
                  <Siren className="h-4 w-4" />
                  <AlertTitle className="flex justify-between">
                    {alert.type}
                    <span className="text-xs text-muted-foreground font-normal">
                      {alert.time}
                    </span>
                  </AlertTitle>
                  <AlertDescription>{alert.message}</AlertDescription>
                </Alert>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Report</CardTitle>
              <CardDescription>
                Daily earnings for the current week.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    unit="₹"
                    tickFormatter={(value) =>
                      new Intl.NumberFormat('en-IN').format(value)
                    }
                  />
                  <Bar
                    dataKey="earnings"
                    fill="hsl(var(--accent))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
