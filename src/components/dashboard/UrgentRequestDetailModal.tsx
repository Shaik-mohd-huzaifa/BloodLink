import React from "react";
import { Clock, MapPin, Phone, User, AlertCircle, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UrgentRequestDetailModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  requestData?: {
    id: string;
    patientName: string;
    bloodType: string;
    location: string;
    hospital: string;
    timePosted: string;
    urgencyLevel: "high" | "medium" | "low";
    contactNumber: string;
    description: string;
  };
}

const UrgentRequestDetailModal: React.FC<UrgentRequestDetailModalProps> = ({
  isOpen = true,
  onClose = () => {},
  requestData = {
    id: "REQ-12345",
    patientName: "Sarah Johnson",
    bloodType: "O-",
    location: "Central Hospital, Downtown",
    hospital: "Central Hospital",
    timePosted: "2 hours ago",
    urgencyLevel: "high" as const,
    contactNumber: "+1 (555) 123-4567",
    description:
      "Urgent need for O- blood for emergency surgery. Patient has suffered severe trauma in a car accident and requires immediate transfusion.",
  },
}) => {
  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyText = (level: string) => {
    switch (level) {
      case "high":
        return "Critical - Needed within hours";
      case "medium":
        return "Urgent - Needed within 24 hours";
      case "low":
        return "Standard - Needed within 48 hours";
      default:
        return "Unknown urgency level";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-md md:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                {requestData.bloodType}
              </span>
              <DialogTitle className="text-xl font-bold">
                Blood Request
              </DialogTitle>
            </div>
            <span
              className={`text-xs px-3 py-1 rounded-full ${getUrgencyColor(requestData.urgencyLevel)}`}
            >
              {getUrgencyText(requestData.urgencyLevel)}
            </span>
          </div>
          <DialogDescription className="text-gray-500 mt-2">
            Request ID: {requestData.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3 mb-3">
              <User className="text-gray-500 h-5 w-5 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Patient</p>
                <p className="text-base">{requestData.patientName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-3">
              <MapPin className="text-gray-500 h-5 w-5 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Location</p>
                <p className="text-base">{requestData.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-3">
              <Clock className="text-gray-500 h-5 w-5 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Posted</p>
                <p className="text-base">{requestData.timePosted}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="text-gray-500 h-5 w-5 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Contact</p>
                <p className="text-base">{requestData.contactNumber}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Description
            </h3>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
              {requestData.description}
            </p>
          </div>

          <div className="bg-red-50 border border-red-100 rounded-md p-3 flex items-start gap-2">
            <AlertCircle className="text-red-500 h-5 w-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-700">
              This is an urgent request. Your quick response could save a life.
              If you're eligible to donate, please respond as soon as possible.
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          <Button
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            onClick={() => {
              // Handle donation response
              console.log("Responding to donation request", requestData.id);
              onClose();
            }}
          >
            <Heart className="h-4 w-4" />
            Respond to Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UrgentRequestDetailModal;
