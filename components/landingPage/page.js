"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

function LandingPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="heading">
        <h1 className="text-[30px] md:text-[40px] font-bold text-center my-9">
          Welcome to Toll expert
        </h1>
        <p className="text-justify md:text-center">
          In the ever-evolving landscape of travel, optimizing your journey is
          essential. Our toll calculator app offers a comprehensive solution,
          allowing you to plan your routes with precision, consider toll costs,
          estimate fuel expenses, calculate travel time, and visualize your
          route on an interactive map. Let's delve into the features that make
          our app a must-have for every traveler.
        </p>
        <br />
        <p className="text-justify md:text-center">
          Unlike traditional toll calculators, our app supports waypoints.
          Easily add stops along your route, and the app will dynamically adjust
          toll costs, fuel estimates, and travel time, ensuring accurate and
          personalized planning.
        </p>

        {/* <Link
          className="w-14 h-[10px] bg-slate-500 rounded-lg"
          href="/dashboard"
        >
          Dashboard
        </Link> */}
      </div>
      <button
        className="w-[100px] h-[40px] bg-blue-200 rounded-lg mt-8"
        onClick={() => {
          router.push("/dashboard", { scroll: false });
        }}
      >
        Dashboard
      </button>
    </div>
  );
}

export default LandingPage;
