import React from "react";
import { MapPin, Clock, Phone, ExternalLink, Navigation } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface LocationDetailModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  location?: {
    id: string;
    name: string;
    type: "hospital" | "blood_bank" | "donor_center";
    address: string;
    distance: string;
    phone: string;
    hours: string;
    bloodAvailability?: {
      "A+": number;
      "A-": number;
      "B+": number;
      "B-": number;
      "AB+": number;
      "AB-": number;
      "O+": number;
      "O-": number;
    };
  };
}

const LocationDetailModal = ({
  isOpen = true,
  onClose = () => {},
  location = {
    id: "loc123",
    name: "Central Blood Bank",
    type: "blood_bank" as const,
    address: "123 Medical Center Blvd, Springfield",
    distance: "1.2 miles",
    phone: "(555) 123-4567",
    hours: "Mon-Fri: 8am-6pm, Sat: 9am-2pm",
    bloodAvailability: {
      "A+": 15,
      "A-": 8,
      "B+": 12,
      "B-": 5,
      "AB+": 3,
      "AB-": 2,
      "O+": 20,
      "O-": 10,
    },
  },
}: LocationDetailModalProps) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "hospital":
        return "Hospital";
      case "blood_bank":
        return "Blood Bank";
      case "donor_center":
        return "Donor Center";
      default:
        return "Location";
    }
  };

  const getBloodLevelColor = (level: number) => {
    if (level <= 3) return "bg-red-500";
    if (level <= 8) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            {location.name}
          </DialogTitle>
          <DialogDescription className="text-sm font-medium text-blue-600">
            {getTypeLabel(location.type)} · {location.distance}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          {/* Location Details */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <span className="text-gray-700">{location.address}</span>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
              <span className="text-gray-700">{location.hours}</span>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
              <span className="text-gray-700">{location.phone}</span>
            </div>
          </div>

          {/* Blood Availability Section */}
          {location.bloodAvailability && (
            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-800 mb-3">
                Blood Availability
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(location.bloodAvailability).map(
                  ([bloodType, level]) => (
                    <div
                      key={bloodType}
                      className="flex flex-col items-center p-2 border rounded-md"
                    >
                      <span className="font-bold text-gray-800">
                        {bloodType}
                      </span>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                        <div
                          className={`h-full ${getBloodLevelColor(level)}`}
                          style={{ width: `${Math.min(level * 10, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 mt-1">
                        {level} units
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={onClose}
          >
            <ExternalLink className="h-4 w-4" />
            Visit Website
          </Button>
          <Button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={onClose}
          >
            <Navigation className="h-4 w-4" />
            Get Directions
          </Button>
          {location.type === "blood_bank" ||
          location.type === "donor_center" ? (
            <Button
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
              onClick={onClose}
            >
              Schedule Donation
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LocationDetailModal;
