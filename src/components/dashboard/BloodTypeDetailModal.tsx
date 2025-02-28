import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Droplet, Users, Clock, Calendar, MapPin, Heart } from "lucide-react";

interface BloodTypeDetailModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  bloodType?: string;
  availability?: number;
  donorsNearby?: number;
  lastUpdated?: string;
  nextDrive?: string;
  location?: string;
  compatibleWith?: string[];
}

const BloodTypeDetailModal = ({
  open = true,
  onOpenChange,
  bloodType = "O+",
  availability = 65,
  donorsNearby = 12,
  lastUpdated = "10 minutes ago",
  nextDrive = "Tomorrow, 9:00 AM",
  location = "Central Blood Bank",
  compatibleWith = ["O+", "A+", "B+", "AB+"],
}: BloodTypeDetailModalProps) => {
  // Determine status color based on availability percentage
  const getStatusColor = () => {
    if (availability >= 70) return "bg-green-500";
    if (availability >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${bloodType.includes("-") ? "bg-red-600" : "bg-red-500"} text-white font-bold text-xl`}
            >
              {bloodType}
            </div>
            <DialogTitle className="text-2xl font-bold">
              Blood Type {bloodType}
            </DialogTitle>
          </div>
          <DialogDescription>
            Detailed information about blood type {bloodType} availability and
            donation options
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Availability Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Droplet className="h-5 w-5 text-red-500" />
              Current Availability
            </h3>
            <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full ${getStatusColor()}`}
                style={{ width: `${availability}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-sm text-gray-600">
              <span>{availability}% Available</span>
              <Badge
                variant={
                  availability < 40
                    ? "destructive"
                    : availability < 70
                      ? "secondary"
                      : "default"
                }
              >
                {availability < 40
                  ? "Critical"
                  : availability < 70
                    ? "Moderate"
                    : "Good"}
              </Badge>
            </div>
          </div>

          {/* Key Information */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600">Donors Nearby:</span>
              </div>
              <p className="font-semibold mt-1">{donorsNearby} donors</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600">Last Updated:</span>
              </div>
              <p className="font-semibold mt-1">{lastUpdated}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600">Next Drive:</span>
              </div>
              <p className="font-semibold mt-1">{nextDrive}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600">Location:</span>
              </div>
              <p className="font-semibold mt-1">{location}</p>
            </div>
          </div>

          {/* Compatible With */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Compatible With
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {compatibleWith.map((type) => (
                <Badge
                  key={type}
                  variant="outline"
                  className="bg-white border-red-200 text-red-700"
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2 mt-4">
          <Button variant="outline">View More Details</Button>
          <Button className="bg-red-600 hover:bg-red-700">Donate Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BloodTypeDetailModal;
