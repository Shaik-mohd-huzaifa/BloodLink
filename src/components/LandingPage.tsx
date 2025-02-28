import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Heart, Droplet, Users, ArrowRight } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold">LifeFlow</h1>
          </div>
          <Button
            onClick={() => navigate("/login")}
            className="bg-red-600 hover:bg-red-700"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Main Hero */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Donate Blood, <span className="text-red-500">Save Lives</span>
            </h1>
            <p className="text-xl text-gray-300">
              Join our community of donors and help those in need. Every
              donation can save up to three lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => navigate("/login")}
                className="bg-red-600 hover:bg-red-700 text-lg py-6 px-8"
              >
                Donate Now
              </Button>
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 text-lg py-6 px-8"
              >
                Request Blood
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Blood Donation"
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <Droplet className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.5M+</h3>
              <p className="text-gray-600">Blood donations needed yearly</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <Users className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">38,000</h3>
              <p className="text-gray-600">Donations needed daily</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">3 Lives</h3>
              <p className="text-gray-600">Saved with each donation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to make a difference?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of donors today and help save lives with just a
            simple donation.
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="bg-white text-red-600 hover:bg-gray-100 text-lg py-6 px-8 rounded-full"
          >
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Heart className="h-8 w-8 text-red-500" />
              <h2 className="text-2xl font-bold">LifeFlow</h2>
            </div>
            <div className="text-gray-400 text-sm">
              © 2023 LifeFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
