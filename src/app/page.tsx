"use client";

import * as React from "react";
import Navbar from "./_components/Navbar";

export default function Home() {
  return (
    <main className="h-full w-full">
      {/* navbar */}

      <Navbar />
      {/* hero */}

      <div className="bg-green-100/20">
        <h1 className="text-6xl font-bold text-center">Build and ship software on a single, collaborative platform</h1>
      </div>
    </main>
  );
}
