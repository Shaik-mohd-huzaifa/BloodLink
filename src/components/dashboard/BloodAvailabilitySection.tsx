import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { InfoIcon, Droplet, AlertCircle } from "lucide-react";

interface BloodTypeData {
  type: string;
  availability: "high" | "medium" | "low" | "critical";
  lastUpdated: string;
  donorsNearby: number;
  compatibleWith: string[];
  color: string;
}

interface BloodAvailabilitySectionProps {
  bloodTypes?: BloodTypeData[];
  onSelectBloodType?: (bloodType: BloodTypeData) => void;
}

const defaultBloodTypes: BloodTypeData[] = [
  {
    type: "O+",
    availability: "high",
    lastUpdated: "10 minutes ago",
    donorsNearby: 24,
    compatibleWith: ["O+", "A+", "B+", "AB+"],
    color: "#E53E3E", // red
  },
  {
    type: "A+",
    availability: "medium",
    lastUpdated: "15 minutes ago",
    donorsNearby: 18,
    compatibleWith: ["A+", "AB+"],
    color: "#3182CE", // blue
  },
  {
    type: "B+",
    availability: "low",
    lastUpdated: "5 minutes ago",
    donorsNearby: 9,
    compatibleWith: ["B+", "AB+"],
    color: "#38A169", // green
  },
  {
    type: "AB+",
    availability: "critical",
    lastUpdated: "2 minutes ago",
    donorsNearby: 3,
    compatibleWith: ["AB+"],
    color: "#805AD5", // purple
  },
  {
    type: "O-",
    availability: "medium",
    lastUpdated: "20 minutes ago",
    donorsNearby: 12,
    compatibleWith: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    color: "#DD6B20", // orange
  },
  {
    type: "A-",
    availability: "low",
    lastUpdated: "30 minutes ago",
    donorsNearby: 7,
    compatibleWith: ["A+", "A-", "AB+", "AB-"],
    color: "#D69E2E", // yellow
  },
];

const getAvailabilityColor = (availability: string) => {
  switch (availability) {
    case "high":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-blue-100 text-blue-800";
    case "low":
      return "bg-yellow-100 text-yellow-800";
    case "critical":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const BloodAvailabilitySection = ({
  bloodTypes = defaultBloodTypes,
  onSelectBloodType = () => {},
}: BloodAvailabilitySectionProps) => {
  const [selectedBloodType, setSelectedBloodType] =
    useState<BloodTypeData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (bloodType: BloodTypeData) => {
    setSelectedBloodType(bloodType);
    setIsDialogOpen(true);
    onSelectBloodType(bloodType);
  };

  return (
    <section className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Blood Availability</h2>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <InfoIcon size={16} />
          <span>Info</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {bloodTypes.map((bloodType) => (
          <Card
            key={bloodType.type}
            className="cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => handleCardClick(bloodType)}
          >
            <CardHeader className="pb-2 pt-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
                style={{
                  backgroundColor: `${bloodType.color}20`,
                  borderColor: bloodType.color,
                  borderWidth: "2px",
                }}
              >
                <span
                  className="text-xl font-bold"
                  style={{ color: bloodType.color }}
                >
                  {bloodType.type}
                </span>
              </div>
              <CardTitle className="text-center">{bloodType.type}</CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-2">
              <div
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(bloodType.availability)}`}
              >
                {bloodType.availability.charAt(0).toUpperCase() +
                  bloodType.availability.slice(1)}
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-4 flex justify-center">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Droplet size={12} />
                {bloodType.donorsNearby} donors nearby
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Blood Type Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedBloodType && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${selectedBloodType.color}20`,
                      borderColor: selectedBloodType.color,
                      borderWidth: "2px",
                    }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: selectedBloodType.color }}
                    >
                      {selectedBloodType.type}
                    </span>
                  </div>
                  Blood Type {selectedBloodType.type}
                </DialogTitle>
                <DialogDescription>
                  Last updated {selectedBloodType.lastUpdated}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(selectedBloodType.availability)}`}
                    >
                      {selectedBloodType.availability.charAt(0).toUpperCase() +
                        selectedBloodType.availability.slice(1)}{" "}
                      Availability
                    </div>
                    {selectedBloodType.availability === "critical" && (
                      <div className="flex items-center text-red-600 text-xs">
                        <AlertCircle size={14} className="mr-1" />
                        Urgent need
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-600">
                    There are currently {selectedBloodType.donorsNearby}{" "}
                    potential donors nearby who match this blood type.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Compatible with:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBloodType.compatibleWith.map((type) => (
                      <div
                        key={type}
                        className="px-2 py-1 bg-gray-100 rounded-md text-xs"
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <Button variant="outline">Find Donors</Button>
                <Button>Donate Now</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BloodAvailabilitySection;
