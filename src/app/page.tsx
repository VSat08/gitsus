"use client";

import * as React from "react";
import Navbar from "./_components/Navbar";
import Globe from "@/components/ui/globe";
import { Button } from "@/components/ui/button";
import Safari from "@/components/ui/safari";
import { AnimatedBeamDemo } from "./_components/AnimatedBeam";
import { MagicCard } from "@/components/ui/magic-card";
import {
  BotMessageSquare,
  Brain,
  BrainCircuit,
  GitGraph,
  Github,
  Network,
  Presentation,
} from "lucide-react";
import { MarqueeDemo } from "./_components/MarqueeDemo";
import TextRevealByWord from "@/components/ui/text-reveal";

export default function Home() {
  return (
    <main className="relative h-full w-full">
      {/* navbar */}

      <Navbar />
      {/* hero */}

      <div className="bg-background">
        {/* section 1 */}
        <div className="flex flex-col items-start gap-20 px-4 pb-40 pt-8 md:px-24 lg:gap-32">
          <div className="sticky top-28 z-10 space-y-8">
            <h1 className="pointer-events-none max-w-4xl whitespace-pre-wrap bg-gradient-to-b from-slate-100/50 via-gray-300/80 to-white bg-clip-text text-center text-3xl font-extrabold leading-none text-transparent md:text-start lg:text-6xl">
              Transform team development with AI-powered collaboration
            </h1>
            <p className="pointer-events-none max-w-5xl text-center text-white/70 md:text-start lg:text-lg">
              Experience seamless development workflows where AI enhances every
              collaboration. From intelligent code reviews to automated
              documentation, elevate your team's productivity on a platform that
              evolves with your needs.
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
        <div className="relative space-y-4 px-4 py-8 md:px-24">
          <h1 className="sticky top-20 flex flex-col space-y-1 text-start text-5xl font-extrabold leading-none lg:text-6xl">
            <span className="font-extralight"> Ask,</span>
            <span className="font-extralight"> Share,</span>
            <span className="">
              Connect with <span className="text-primary">GitSus</span>
            </span>
          </h1>
          <div className="relative shadow-2xl shadow-primary/40">
            <Safari
              url="gitsus.org"
              className="size-full"
              videoSrc="/gitsus.mp4"
            />
          </div>
        </div>

        {/* section 3 */}
        <div className="flex w-full flex-col gap-8 px-4 pb-8 pt-16 md:px-24 lg:flex-row">
          <AnimatedBeamDemo />
          <div className="flex flex-col items-end gap-4">
            <div
              className={
                "grid h-full w-full grid-cols-2 items-center justify-between gap-4 md:grid-cols-2 lg:grid-cols-3"
              }
            >
              <MagicCard
                className="flex cursor-pointer flex-col items-center p-4 shadow-2xl md:justify-center"
                gradientColor="#D9D9D955"
              >
                <div className="flex flex-col-reverse gap-1">
                  <h1>AI-Powered Assistance </h1>
                  <BrainCircuit />
                </div>
                <p className="mt-4 text-sm font-light text-gray-500">
                  Streamline your workflow with AI-powered tools to automate
                  repetitive tasks and boost productivity.
                </p>
              </MagicCard>
              <MagicCard
                className="flex cursor-pointer flex-col items-center p-4 shadow-2xl md:justify-center"
                gradientColor="#D9D9D955"
              >
                <div className="flex flex-col-reverse gap-1">
                  <h1>Smart Commit Messages </h1>
                  <GitGraph />
                </div>
                <p className="mt-4 text-sm font-light text-gray-500">
                  Generate meaningful and context-aware Git commit messages with
                  just a click, powered by AI.
                </p>
              </MagicCard>
              <MagicCard
                className="flex cursor-pointer flex-col items-center p-4 shadow-2xl md:justify-center"
                gradientColor="#D9D9D955"
              >
                <div className="flex flex-col-reverse gap-1">
                  <h1>Optimized GitHub Integration </h1>
                  <Github />
                </div>
                <p className="mt-4 text-sm font-light text-gray-500">
                  Seamlessly connect and manage your GitHub repositories for
                  efficient project tracking.
                </p>
              </MagicCard>
              <MagicCard
                className="flex cursor-pointer flex-col items-center p-4 shadow-2xl md:justify-center"
                gradientColor="#D9D9D955"
              >
                <div className="flex flex-col-reverse gap-1">
                  <h1>AI-Driven Meeting Insights </h1>
                  <Presentation />
                </div>
                <p className="mt-4 text-sm font-light text-gray-500">
                  Turn meetings into actionable insights—create issues and tasks
                  with AI-generated precision.
                </p>
              </MagicCard>
              <MagicCard
                className="flex cursor-pointer flex-col items-center p-4 shadow-2xl md:justify-center"
                gradientColor="#D9D9D955"
              >
                <div className="flex flex-col-reverse gap-1">
                  <h1>Interactive Q&A Management </h1>
                  <BotMessageSquare />
                </div>
                <p className="mt-4 text-sm font-light text-gray-500">
                  Create, save, and access a dynamic Q&A repository tailored to
                  your team's needs.
                </p>
              </MagicCard>
              <MagicCard
                className="flex cursor-pointer flex-col items-center p-4 shadow-2xl md:justify-center"
                gradientColor="#D9D9D955"
              >
                <div className="flex flex-col-reverse gap-1">
                  <h1>Collaborative Workspaces</h1>
                  <Network />
                </div>
                <p className="mt-4 text-sm font-light text-gray-500">
                  Empower your team with a unified, AI-enhanced collaborative
                  workspace for better communication.
                </p>
              </MagicCard>
            </div>
          </div>
        </div>

        {/* section 4 */}
        <div className="w-full py-2">
          <div className="z-10 flex min-h-64 w-full items-center justify-center rounded-lg">
            <TextRevealByWord text="GitSus transforms development collaboration into an AI-powered seamless experience." />
          </div>
        </div>
        {/* section 5 */}
        <div className="w-full py-2">
          <MarqueeDemo />
        </div>
      </div>
    </main>
  );
}
