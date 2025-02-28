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
import { Droplet, MapPin, Clock, User, Calendar } from "lucide-react";

interface BloodRequest {
  id: string;
  bloodType: string;
  patientName: string;
  hospital: string;
  location: string;
  postedDate: string;
  requiredBy: string;
  urgencyLevel: "critical" | "high" | "medium" | "low";
  distance: string;
  requiredUnits: number;
  status: "active" | "fulfilled" | "expired";
}

interface BloodRequestsListProps {
  requests?: BloodRequest[];
  onRequestSelect?: (request: BloodRequest) => void;
}

const defaultRequests: BloodRequest[] = [
  {
    id: "REQ-001",
    bloodType: "O-",
    patientName: "Sarah Johnson",
    hospital: "Memorial Hospital",
    location: "Downtown, Springfield",
    postedDate: "2 hours ago",
    requiredBy: "Today, 8:00 PM",
    urgencyLevel: "critical",
    distance: "2.5 miles",
    requiredUnits: 3,
    status: "active",
  },
  {
    id: "REQ-002",
    bloodType: "AB+",
    patientName: "Michael Chen",
    hospital: "City Medical Center",
    location: "Westside, Springfield",
    postedDate: "5 hours ago",
    requiredBy: "Tomorrow, 10:00 AM",
    urgencyLevel: "high",
    distance: "4.2 miles",
    requiredUnits: 2,
    status: "active",
  },
  {
    id: "REQ-003",
    bloodType: "A+",
    patientName: "Emma Rodriguez",
    hospital: "Children's Hospital",
    location: "Northside, Springfield",
    postedDate: "Yesterday",
    requiredBy: "Tomorrow, 6:00 PM",
    urgencyLevel: "medium",
    distance: "6.8 miles",
    requiredUnits: 1,
    status: "active",
  },
  {
    id: "REQ-004",
    bloodType: "B-",
    patientName: "David Wilson",
    hospital: "General Hospital",
    location: "Eastside, Springfield",
    postedDate: "Yesterday",
    requiredBy: "In 2 days",
    urgencyLevel: "low",
    distance: "3.5 miles",
    requiredUnits: 2,
    status: "active",
  },
  {
    id: "REQ-005",
    bloodType: "O+",
    patientName: "Sophia Martinez",
    hospital: "University Medical Center",
    location: "Southside, Springfield",
    postedDate: "2 days ago",
    requiredBy: "In 3 days",
    urgencyLevel: "medium",
    distance: "5.1 miles",
    requiredUnits: 2,
    status: "active",
  },
];

const BloodRequestsList = ({
  requests = defaultRequests,
  onRequestSelect = () => {},
}: BloodRequestsListProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-600 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-black";
      case "low":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
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
      case "low":
        return "LOW";
      default:
        return "NORMAL";
    }
  };

  const filteredRequests =
    selectedFilter === "all"
      ? requests
      : requests.filter((request) => request.urgencyLevel === selectedFilter);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Blood Requests</h2>
        <div className="flex space-x-2">
          <Button
            variant={selectedFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("all")}
            className={selectedFilter === "all" ? "bg-gray-800" : ""}
          >
            All
          </Button>
          <Button
            variant={selectedFilter === "critical" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("critical")}
            className={
              selectedFilter === "critical"
                ? "bg-red-600"
                : "text-red-600 border-red-200"
            }
          >
            Critical
          </Button>
          <Button
            variant={selectedFilter === "high" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("high")}
            className={
              selectedFilter === "high"
                ? "bg-orange-500"
                : "text-orange-600 border-orange-200"
            }
          >
            High
          </Button>
          <Button
            variant={selectedFilter === "medium" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("medium")}
            className={
              selectedFilter === "medium"
                ? "bg-yellow-500 text-black"
                : "text-yellow-600 border-yellow-200"
            }
          >
            Medium
          </Button>
          <Button
            variant={selectedFilter === "low" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("low")}
            className={
              selectedFilter === "low"
                ? "bg-blue-500"
                : "text-blue-600 border-blue-200"
            }
          >
            Low
          </Button>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No blood requests match the selected filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRequests.map((request) => (
            <Card
              key={request.id}
              className="cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => onRequestSelect(request)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <Droplet className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-xl">
                      {request.bloodType}
                    </CardTitle>
                  </div>
                  <Badge className={`${getUrgencyColor(request.urgencyLevel)}`}>
                    {getUrgencyLabel(request.urgencyLevel)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    <span>{request.patientName}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>
                      {request.hospital} ({request.distance})
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Posted {request.postedDate}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Needed by {request.requiredBy}</span>
                  </div>
                  <div className="mt-2 text-sm font-medium">
                    {request.requiredUnits} unit
                    {request.requiredUnits > 1 ? "s" : ""} required
                  </div>
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
      )}
    </div>
  );
};

export default BloodRequestsList;
