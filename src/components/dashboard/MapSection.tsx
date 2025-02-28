import React, { useState } from "react";
import { Button } from "../ui/button";
import { MapPin, Navigation, Search, Plus, Minus } from "lucide-react";
import { Badge } from "../ui/badge";

interface Location {
  id: string;
  name: string;
  type: "hospital" | "blood_bank" | "donor_center";
  coordinates: { lat: number; lng: number };
  bloodTypes: string[];
  distance: string;
  address: string;
}

interface MapSectionProps {
  locations?: Location[];
  onLocationSelect?: (location: Location) => void;
  userLocation?: { lat: number; lng: number };
}

const defaultLocations: Location[] = [
  {
    id: "loc1",
    name: "Central Blood Bank",
    type: "blood_bank",
    coordinates: { lat: 34.052, lng: -118.243 },
    bloodTypes: ["A+", "O+", "B-"],
    distance: "0.8 miles",
    address: "123 Main St, Los Angeles, CA",
  },
  {
    id: "loc2",
    name: "Memorial Hospital",
    type: "hospital",
    coordinates: { lat: 34.048, lng: -118.259 },
    bloodTypes: ["AB+", "O-", "A-"],
    distance: "1.2 miles",
    address: "456 Medical Center Blvd, Los Angeles, CA",
  },
  {
    id: "loc3",
    name: "Community Donor Center",
    type: "donor_center",
    coordinates: { lat: 34.061, lng: -118.235 },
    bloodTypes: ["O+", "B+"],
    distance: "1.5 miles",
    address: "789 Donation Ave, Los Angeles, CA",
  },
  {
    id: "loc4",
    name: "City Medical Center",
    type: "hospital",
    coordinates: { lat: 34.055, lng: -118.278 },
    bloodTypes: ["A+", "AB-", "O+"],
    distance: "2.3 miles",
    address: "101 Healthcare Dr, Los Angeles, CA",
  },
  {
    id: "loc5",
    name: "Regional Blood Services",
    type: "blood_bank",
    coordinates: { lat: 34.037, lng: -118.227 },
    bloodTypes: ["B+", "O-", "AB+"],
    distance: "3.1 miles",
    address: "202 Donation Blvd, Los Angeles, CA",
  },
];

const MapSection = ({
  locations = defaultLocations,
  onLocationSelect = () => {},
  userLocation = { lat: 34.052, lng: -118.243 },
}: MapSectionProps) => {
  const [zoom, setZoom] = useState(13);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    onLocationSelect(location);
  };

  const getLocationPinColor = (type: string) => {
    switch (type) {
      case "hospital":
        return "bg-blue-500";
      case "blood_bank":
        return "bg-red-500";
      case "donor_center":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getLocationTypeLabel = (type: string) => {
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

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Nearby Locations</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Search size={16} />
            <span>Search Area</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setZoom(Math.min(zoom + 1, 18))}
          >
            <Plus size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setZoom(Math.max(zoom - 1, 10))}
          >
            <Minus size={16} />
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden mb-4 border border-gray-200">
        {/* This would be replaced with an actual map component */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-50"></div>

        {/* User location pin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center">
            <span className="text-white text-xs">You</span>
          </div>
        </div>

        {/* Location pins */}
        {locations.map((location, index) => {
          // Calculate position based on index for demo purposes
          const top = 30 + index * 15 + "%";
          const left = 25 + index * 12 + "%";

          return (
            <div
              key={location.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ top, left }}
              onClick={() => handleLocationClick(location)}
            >
              <div
                className={`w-5 h-5 rounded-full ${getLocationPinColor(location.type)} border-2 border-white shadow-lg flex items-center justify-center`}
              >
                <MapPin className="h-3 w-3 text-white" />
              </div>

              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white p-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <div className="text-sm font-medium">{location.name}</div>
                <div className="text-xs text-gray-600">
                  {getLocationTypeLabel(location.type)} · {location.distance}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {location.bloodTypes.map((type) => (
                    <Badge
                      key={type}
                      variant="outline"
                      className="text-xs py-0 h-5"
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* Selected location info */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-md shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">
                  {selectedLocation.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {getLocationTypeLabel(selectedLocation.type)} ·{" "}
                  {selectedLocation.distance}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedLocation.address}
                </p>
              </div>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
              >
                <Navigation className="h-3 w-3" />
                <span>Directions</span>
              </Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedLocation.bloodTypes.map((type) => (
                <Badge
                  key={type}
                  variant="outline"
                  className="text-xs py-0 h-5"
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Hospitals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Blood Banks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Donor Centers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-600 border border-white"></div>
          <span>Your Location</span>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
