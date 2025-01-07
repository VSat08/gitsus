// "use client";
// import useProject from "@/hooks/use-project";
// import { useUser } from "@clerk/nextjs";
// import { Github, TrendingUp } from "lucide-react";
// import Link from "next/link";
// import React from "react";
// import CommitLog from "./commit-log";
// import AskQuestionCard from "./ask-question-card";
// import MeetingCard from "./meeting-card";
// import ArchiveButton from "./archive-button";
// import InviteButton from "./invite-button";
// import TeamMembers from "./team-members";

// const DashboardPage = () => {
//   const { project } = useProject();

//   return (
//     <div>
//       {/* {project?.id} */}
//       <div className="flex flex-wrap items-center justify-between gap-y-4">
//         {/* Github link connect  */}

//
//           <div className="w-fit rounded-xl bg-primary px-4 py-3">
//             <div className="flex items-center">
//               <Github className="size-5 text-white" />
//               <div className="ml-2">
//                 <p className="text-xs font-medium text-white sm:text-sm">
//                   This project is linked to{" "}
//                   <Link
//                     target="_blank"
//                     href={project?.githubUrl ?? ""}
//                     className="inline-flex items-center text-white/80 hover:underline"
//                   >
//                     {project?.githubUrl}
//                     <TrendingUp className="ml-1 size-5" />
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//

//         <div className="h-4"></div>

//         <div className="flex items-center gap-2">
//           <TeamMembers />
//           <InviteButton />
//           <ArchiveButton />
//         </div>
//       </div>
//       <div className="mt-4">
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
//           <AskQuestionCard />
//           <MeetingCard />
//         </div>
//       </div>
//       <div className="mt-8"></div>
//       <CommitLog />
//     </div>
//   );
// };

// export default DashboardPage;
"use client";
import useProject from "@/hooks/use-project";
import { Github, TrendingUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import CommitLog from "./commit-log";
import AskQuestionCard from "./ask-question-card";
import MeetingCard from "./meeting-card";
import ArchiveButton from "./archive-button";
import InviteButton from "./invite-button";
import TeamMembers from "./team-members";

const DashboardPage = () => {
  const { project, isLoading, error } = useProject(); // Assuming `useProject` provides these states.

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading project: {error.message}</div>;
  }

  // First-time user without a project
  if (!project) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-3xl font-semibold">Welcome! 👋</p>
        <p className="text-sm text-gray-600">
          You don't have a project yet. Start by creating one!
        </p>
        {/* Add a button or link to create a project */}
        <button
          className="hover:bg-primary-dark mt-4 rounded-lg bg-primary px-4 py-2 text-white"
          onClick={() => {
            // Logic to navigate to the create-project flow
          }}
        >
          Create Your First Project
        </button>
      </div>
    );
  }

  // Normal flow when a project exists
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        {/* GitHub link connection */}
        {project.githubUrl && (
          <div className="w-fit rounded-xl bg-primary px-4 py-3">
            <div className="flex items-center">
              <Github className="h-5 w-5 text-white" />
              <div className="ml-2">
                <p className="text-xs font-medium text-white sm:text-sm">
                  This project is linked to{" "}
                  <Link
                    target="_blank"
                    href={project.githubUrl}
                    className="inline-flex items-center text-white/80 hover:underline"
                  >
                    {project.githubUrl}
                    <TrendingUp className="ml-1 h-5 w-5" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <TeamMembers />
          <InviteButton />
          <ArchiveButton />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-5">
        <AskQuestionCard />
        <MeetingCard />
      </div>

      <div className="mt-8">
        <CommitLog />
      </div>
    </div>
  );
};

export default DashboardPage;
