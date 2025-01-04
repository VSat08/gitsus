"use client";
import useProject from "@/hooks/use-project";
import { useUser } from "@clerk/nextjs";
import { Github, TrendingUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import CommitLog from "./commit-log";
import AskQuestionCard from "./ask-question-card";
import MeetingCard from "./meeting-card";

const DashboardPage = () => {
  const { project } = useProject();
  return (
    <div>
      {/* {project?.id} */}
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        {/* Github link connect  */}
        <div className="w-fit rounded-xl bg-primary px-4 py-3">
          <div className="flex items-center">
            <Github className="size-5 text-white" />
            <div className="ml-2">
              <p className="text-xs font-medium text-white sm:text-sm">
                This project is linked to{" "}
                <Link
                  target="_blank"
                  href={project?.githubUrl ?? ""}
                  className="inline-flex items-center text-white/80 hover:underline"
                >
                  {project?.githubUrl}
                  <TrendingUp className="ml-1 size-5" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="h-4"></div>

        <div className="flex items-center gap-4">
          TeamMembers InviteButton ArchiveButton
        </div>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          <AskQuestionCard/>
          <MeetingCard/>
        </div>
      </div>
      <div className="mt-8"></div>
      <CommitLog />
    </div>
  );
};

export default DashboardPage;
