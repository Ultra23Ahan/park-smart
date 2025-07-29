import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Clock, Download, IndianRupee, MapPin, PlusCircle } from "lucide-react";

const bookings = [
    { id: "BK001", location: "Downtown Lot A", date: "2024-08-15 10:00", duration: "2h", status: "Upcoming", vehicle: "MH 12 AB 1234" },
    { id: "BK002", location: "Airport Complex", date: "2024-07-20 18:30", duration: "5h", status: "Completed", vehicle: "DL 3C XY 5678" },
    { id: "BK003", location: "Uptown Mall", date: "2024-07-10 12:00", duration: "3h", status: "Completed", vehicle: "MH 12 AB 1234" },
];

const payments = [
    { id: "PAY001", date: "2024-07-20", amount: "250.00", status: "Paid", bookingId: "BK002" },
    { id: "PAY002", date: "2024-07-10", amount: "150.00", status: "Paid", bookingId: "BK003" },
]

const vehicles = [
    { number: "MH 12 AB 1234", nickname: "My Sedan", default: true },
    { number: "DL 3C XY 5678", nickname: "Work SUV", default: false },
]

const nftTags = [
    { id: "NFT-A1B2", vehicle: "MH 12 AB 1234", status: "Active" },
    { id: "NFT-C3D4", vehicle: "DL 3C XY 5678", status: "Active" },
]

export default function DashboardPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="vehicles">Manage Vehicles</TabsTrigger>
          <TabsTrigger value="nft">NFT Tag Status</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>View your past, present, and upcoming parking bookings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.location}</TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>{booking.duration}</TableCell>
                      <TableCell>{booking.vehicle}</TableCell>
                      <TableCell>
                        <Badge variant={booking.status === 'Upcoming' ? 'default' : 'secondary'}>{booking.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Review your transaction history and download receipts.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell><IndianRupee className="inline h-4 w-4 mr-1"/>{payment.amount}</TableCell>
                      <TableCell>{payment.bookingId}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-accent border-accent">{payment.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicles" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Manage Vehicles</CardTitle>
                <CardDescription>Add, edit, or remove your vehicles.</CardDescription>
              </div>
              <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" />Add Vehicle</Button>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.number} className="p-4 flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg">{vehicle.number}</p>
                    <p className="text-sm text-muted-foreground">{vehicle.nickname}</p>
                  </div>
                  {vehicle.default && <Badge>Default</Badge>}
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nft" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>NFT Tag Status</CardTitle>
              <CardDescription>Check the status of your linked NFT parking tags.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tag ID</TableHead>
                            <TableHead>Linked Vehicle</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {nftTags.map((tag) => (
                        <TableRow key={tag.id}>
                            <TableCell className="font-mono">{tag.id}</TableCell>
                            <TableCell>{tag.vehicle}</TableCell>
                            <TableCell>
                                <Badge variant={tag.status === 'Active' ? 'default' : 'destructive'} className={tag.status === 'Active' ? 'bg-accent hover:bg-accent/80' : ''}>
                                    {tag.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
