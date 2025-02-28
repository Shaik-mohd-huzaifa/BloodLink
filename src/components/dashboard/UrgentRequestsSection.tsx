import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Clock, MapPin, Droplet, AlertCircle, ArrowRight } from "lucide-react";

interface UrgentRequest {
  id: string;
  bloodType: string;
  location: string;
  hospital: string;
  timePosted: string;
  urgencyLevel: "critical" | "high" | "medium";
  distance: string;
  patientCondition: string;
  requiredUnits: number;
}

interface UrgentRequestsSectionProps {
  requests?: UrgentRequest[];
  onRequestSelect?: (request: UrgentRequest) => void;
}

const UrgentRequestsSection = ({
  requests = [
    {
      id: "1",
      bloodType: "O-",
      location: "Memorial Hospital",
      hospital: "Memorial Hospital",
      timePosted: "15 minutes ago",
      urgencyLevel: "critical",
      distance: "2.5 miles",
      patientCondition: "Trauma patient in emergency surgery",
      requiredUnits: 3,
    },
    {
      id: "2",
      bloodType: "AB+",
      location: "City Medical Center",
      hospital: "City Medical Center",
      timePosted: "45 minutes ago",
      urgencyLevel: "high",
      distance: "4.2 miles",
      patientCondition: "Scheduled organ transplant",
      requiredUnits: 2,
    },
    {
      id: "3",
      bloodType: "A+",
      location: "Children's Hospital",
      hospital: "Children's Hospital",
      timePosted: "1 hour ago",
      urgencyLevel: "medium",
      distance: "6.8 miles",
      patientCondition: "Pediatric cancer patient",
      requiredUnits: 1,
    },
  ],
  onRequestSelect = () => {},
}: UrgentRequestsSectionProps) => {
  const [selectedRequest, setSelectedRequest] = useState<UrgentRequest | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRequestClick = (request: UrgentRequest) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
    onRequestSelect(request);
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-600 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-black";
      default:
        return "bg-blue-500 text-white";
    }
  };

  const getUrgencyLabel = (level: string) => {
    switch (level) {
      case "critical":
        return "CRITICAL";
      case "high":
        return "HIGH";
      case "medium":
        return "MEDIUM";
      default:
        return "NORMAL";
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <AlertCircle className="mr-2 text-red-600" />
          Urgent Blood Requests
        </h2>
        <Button variant="outline" size="sm">
          View All <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map((request) => (
          <Card
            key={request.id}
            className="cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => handleRequestClick(request)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <Droplet className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle>{request.bloodType}</CardTitle>
                </div>
                <Badge className={`${getUrgencyColor(request.urgencyLevel)}`}>
                  {getUrgencyLabel(request.urgencyLevel)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>
                    {request.hospital} ({request.distance})
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{request.timePosted}</span>
                </div>
                <p className="text-sm mt-2 line-clamp-2">
                  {request.patientCondition}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Respond Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedRequest && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
                  <Droplet className="h-5 w-5 text-red-600" />
                </div>
                Urgent Request: {selectedRequest.bloodType}
                <Badge
                  className={`ml-2 ${getUrgencyColor(selectedRequest.urgencyLevel)}`}
                >
                  {getUrgencyLabel(selectedRequest.urgencyLevel)}
                </Badge>
              </DialogTitle>
              <DialogDescription>
                This request was posted {selectedRequest.timePosted}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="font-medium">
                    {selectedRequest.hospital}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({selectedRequest.distance})
                  </span>
                </div>
                <div>
                  <h4 className="font-medium">Patient Condition:</h4>
                  <p className="text-gray-700">
                    {selectedRequest.patientCondition}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Required Units:</h4>
                  <p className="text-gray-700">
                    {selectedRequest.requiredUnits} units of{" "}
                    {selectedRequest.bloodType} blood
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
              <div className="flex gap-2">
                <Button variant="secondary">Share Request</Button>
                <Button className="bg-red-600 hover:bg-red-700">
                  Respond Now
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default UrgentRequestsSection;
