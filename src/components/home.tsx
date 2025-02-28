import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./dashboard/Header";
import SearchFilterBar from "./dashboard/SearchFilterBar";
import BloodAvailabilitySection from "./dashboard/BloodAvailabilitySection";
import UrgentRequestsSection from "./dashboard/UrgentRequestsSection";
import BloodRequestsList from "./dashboard/BloodRequestsList";
import MatchingDonorsSection from "./dashboard/MatchingDonorsSection";
import { Button } from "./ui/button";
import { Droplet, Heart } from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-red-600 hover:bg-red-700 py-6 text-lg flex-1 max-w-xs mx-auto"
            onClick={() => navigate("/request-blood")}
          >
            <Droplet className="mr-2 h-5 w-5" />
            Request Blood
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 py-6 text-lg flex-1 max-w-xs mx-auto"
            onClick={() => navigate("/donate-blood")}
          >
            <Heart className="mr-2 h-5 w-5" />
            Donate Blood
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 py-6 text-lg flex-1 max-w-xs mx-auto"
            onClick={() => navigate("/profile")}
          >
            Update Profile
          </Button>
        </div>

        <SearchFilterBar />
        <BloodAvailabilitySection />
        <UrgentRequestsSection />
        <MatchingDonorsSection />
        <BloodRequestsList />
      </div>
    </div>
  );
}

export default Home;
