import React from "react";
import { Header } from "./dashboard/Header";
import SearchFilterBar from "./dashboard/SearchFilterBar";
import BloodAvailabilitySection from "./dashboard/BloodAvailabilitySection";
import UrgentRequestsSection from "./dashboard/UrgentRequestsSection";
import BloodRequestsList from "./dashboard/BloodRequestsList";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6 space-y-6">
        <SearchFilterBar />
        <BloodAvailabilitySection />
        <BloodRequestsList />
        <UrgentRequestsSection />
      </div>
    </div>
  );
}

export default Home;
