import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Droplet, Calendar, Clock, Heart, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Header } from "./Header";

const donationSchema = z.object({
  bloodType: z.string().min(1, { message: "Please select your blood type" }),
  preferredDate: z
    .string()
    .min(1, { message: "Please select a preferred date" }),
  preferredTime: z
    .string()
    .min(1, { message: "Please select a preferred time" }),
  preferredLocation: z
    .string()
    .min(2, { message: "Please enter a preferred location" }),
  lastDonation: z.string().optional(),
  medicalConditions: z.string().optional(),
  medications: z.string().optional(),
  additionalInfo: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type DonationFormValues = z.infer<typeof donationSchema>;

const DonateBloodForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      bloodType: "",
      preferredDate: "",
      preferredTime: "",
      preferredLocation: "",
      lastDonation: "",
      medicalConditions: "",
      medications: "",
      additionalInfo: "",
      consent: false,
    },
  });

  const onSubmit = async (data: DonationFormValues) => {
    setIsLoading(true);
    try {
      // Simulate API call
      console.log("Donation data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message and navigate back to dashboard
      alert("Donation request submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Donation submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Donate Blood
          </h1>

          <Card>
            <CardHeader>
              <CardTitle>Blood Donation Form</CardTitle>
              <CardDescription>
                Schedule your blood donation appointment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex">
                  <Heart className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-700 font-medium">
                      Thank you for choosing to donate!
                    </p>
                    <p className="text-sm text-blue-600">
                      Your donation can save up to three lives. Please fill out
                      this form to schedule your donation.
                    </p>
                  </div>
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bloodType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blood Type</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="">Select blood type</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                              <option value="unknown">I don't know</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastDonation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Donation Date (if any)</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormDescription>
                            Leave empty if you've never donated
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Donation Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Time</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="">Select time slot</option>
                              <option value="morning">
                                Morning (8AM - 12PM)
                              </option>
                              <option value="afternoon">
                                Afternoon (12PM - 4PM)
                              </option>
                              <option value="evening">
                                Evening (4PM - 8PM)
                              </option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Donation Center</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Donation center or hospital"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="medicalConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical Conditions (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List any medical conditions you have"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Medications (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List any medications you are currently taking"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any other details that might be helpful"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                        <FormControl>
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I confirm that I am eligible to donate blood and
                            consent to the donation process
                          </FormLabel>
                          <FormDescription>
                            By checking this box, you agree to our{" "}
                            <a
                              href="#"
                              className="text-red-600 hover:text-red-500"
                            >
                              donation terms and conditions
                            </a>
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate("/dashboard")}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Heart className="h-4 w-4" />
                          Schedule Donation
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonateBloodForm;
