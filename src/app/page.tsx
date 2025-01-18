"use client";

import * as React from "react";
import Navbar from "./_components/Navbar";
import Globe from "@/components/ui/globe";
import { Button } from "@/components/ui/button";
import Safari from "@/components/ui/safari";

export default function Home() {
  return (
    <main className="relative h-full w-full">
      {/* navbar */}

      <Navbar />
      {/* hero */}

      <div className="bg-background px-4 md:px-24">
        {/* section 1 */}
        <div className="scroll-hidden relative flex h-screen flex-col items-center gap-20 overflow-y-auto overflow-x-hidden pb-40 pt-8 lg:gap-32">
          {/* <div className=""></div> */}
          <div className="sticky top-24 z-10 space-y-8">
            <h1 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-slate-100/50 via-gray-300/80 to-white bg-clip-text text-start text-3xl font-extrabold leading-none text-transparent lg:text-6xl">
              Build and ship software on a single, collaborative platform
            </h1>
            <p className="pointer-events-none text-gray-500 lg:text-lg">
              Join the world’s most widely adopted AI-powered developer
              platform.
            </p>
            <div className="flex items-center justify-center gap-4 sm:justify-start">
              <button className="relative p-[3px]">
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500" />
                <div className="group relative rounded-sm bg-black px-8 py-2.5 text-white transition duration-200 hover:bg-transparent">
                  Try Gitsus
                </div>
              </button>
              <Button
                variant="outline"
                className="bg-transparent px-16 py-6 outline outline-secondary-foreground backdrop-blur-sm hover:bg-white hover:text-black"
              >
                Docs
              </Button>
            </div>
          </div>

          <Globe className="scale-110 lg:scale-[1.7]" />
          {/* <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" /> */}
        </div>

        {/* section 2 */}
        <div className="py-8 space-y-4">
          <h1 className="flex flex-col space-y-1 text-start text-3xl font-extrabold leading-none lg:text-6xl">
            <span className="font-extralight"> Ask,</span>
            <span className="font-extralight"> Share,</span>
            <span className="text-primary"> Connect with GitSus</span>
          </h1>
          <div className="relative shadow-2xl shadow-primary/40">
            <Safari
              url="gitsus.org"
              className="size-full"
              videoSrc="/gitsus.mp4"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
