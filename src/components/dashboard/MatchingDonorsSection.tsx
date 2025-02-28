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
import { Droplet, MapPin, Phone, User, Calendar, Check } from "lucide-react";

interface MatchingDonor {
  id: string;
  name: string;
  bloodType: string;
  location: string;
  distance: string;
  lastDonation: string;
  contactNumber: string;
  matchPercentage: number;
  availability: "available" | "busy" | "pending";
}

interface MatchingDonorsSectionProps {
  donors?: MatchingDonor[];
  onDonorSelect?: (donor: MatchingDonor) => void;
}

const defaultDonors: MatchingDonor[] = [
  {
    id: "donor-001",
    name: "Michael Chen",
    bloodType: "O+",
    location: "Downtown, Springfield",
    distance: "1.2 miles",
    lastDonation: "3 months ago",
    contactNumber: "(555) 123-4567",
    matchPercentage: 98,
    availability: "available",
  },
  {
    id: "donor-002",
    name: "Sarah Johnson",
    bloodType: "A-",
    location: "Westside, Springfield",
    distance: "2.5 miles",
    lastDonation: "5 months ago",
    contactNumber: "(555) 234-5678",
    matchPercentage: 95,
    availability: "available",
  },
  {
    id: "donor-003",
    name: "David Rodriguez",
    bloodType: "B+",
    location: "Northside, Springfield",
    distance: "3.7 miles",
    lastDonation: "2 months ago",
    contactNumber: "(555) 345-6789",
    matchPercentage: 92,
    availability: "busy",
  },
  {
    id: "donor-004",
    name: "Emily Wilson",
    bloodType: "AB+",
    location: "Eastside, Springfield",
    distance: "4.1 miles",
    lastDonation: "6 months ago",
    contactNumber: "(555) 456-7890",
    matchPercentage: 88,
    availability: "pending",
  },
];

const MatchingDonorsSection = ({
  donors = defaultDonors,
  onDonorSelect = () => {},
}: MatchingDonorsSectionProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800";
      case "busy":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAvailabilityLabel = (availability: string) => {
    switch (availability) {
      case "available":
        return "Available";
      case "busy":
        return "Unavailable";
      case "pending":
        return "Pending";
      default:
        return "Unknown";
    }
  };

  const filteredDonors =
    selectedFilter === "all"
      ? donors
      : donors.filter((donor) => donor.availability === selectedFilter);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Matching Donors</h2>
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
            variant={selectedFilter === "available" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("available")}
            className={
              selectedFilter === "available"
                ? "bg-green-600"
                : "text-green-600 border-green-200"
            }
          >
            Available
          </Button>
          <Button
            variant={selectedFilter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("pending")}
            className={
              selectedFilter === "pending"
                ? "bg-yellow-500 text-black"
                : "text-yellow-600 border-yellow-200"
            }
          >
            Pending
          </Button>
        </div>
      </div>

      {filteredDonors.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No matching donors found for the selected filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDonors.map((donor) => (
            <Card
              key={donor.id}
              className="cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => onDonorSelect(donor)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <Droplet className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-xl">{donor.bloodType}</CardTitle>
                  </div>
                  <Badge
                    className={`${getAvailabilityColor(donor.availability)}`}
                  >
                    {getAvailabilityLabel(donor.availability)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    <span>{donor.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>
                      {donor.location} ({donor.distance})
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Last donation: {donor.lastDonation}</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm font-medium flex justify-between">
                      <span>Match:</span>
                      <span className="text-green-600">
                        {donor.matchPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${donor.matchPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Donor
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchingDonorsSection;
