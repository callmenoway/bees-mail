"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Progress } from "@/components/ui/progress";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
//import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useState } from "react";
import trpc from "@/utils/trpc";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await trpc.logInput.mutate({ email, password });
      console.log(response);
    } catch (error) {
      console.error("Error logging input:", error);
    }
  };

  return (
    <main className="bg-gradient-to-b from-yellow-50 to-yellow-100 min-h-screen">
      <header className="bg-yellow-600 text-white py-4">
        <NavigationMenu>
          <NavigationMenuList className="flex justify-center">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="#features">
                  Explore Features
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="#docs">
                  Read Documentation
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Pricing</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="#pricing">
                  View Pricing
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <section className="text-center py-12">
        <h1 className="text-5xl font-extrabold text-yellow-800">Beesmail</h1>
        <p className="mt-4 text-xl text-yellow-700">
          Revolutionizing asynchronous messaging with the Honeycomb protocol.
        </p>
      </section>

      <section id="features" className="py-12 px-4">
        <h2 className="text-3xl font-bold text-yellow-800 mb-6">
          API Usage Statistics
        </h2>
      </section>

      <section id="progress" className="py-12 px-4">
        <h2 className="text-3xl font-bold text-yellow-800 mb-6">
          Deployment Progress
        </h2>
        <Progress value={66} className="w-full max-w-3xl mx-auto" />
      </section>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 bg-white shadow-md rounded"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
