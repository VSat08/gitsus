// import { api } from "@/trpc/react";
// import { useLocalStorage } from "usehooks-ts";

// const useProject = () => {
//   const { data: projects } = api.project.getProjects.useQuery();
//   const [projectId, setProjectId] = useLocalStorage("gitsus-projectId", "");
//   const project = projects?.find((project) => project.id === projectId);
//   return {
//     projects,
//     project,
//     projectId,
//     setProjectId
//   };
// };

// export default useProject;


import { api } from "@/trpc/react";
import { useLocalStorage } from "usehooks-ts";

const useProject = () => {
  // Fetch all projects
  const {
    data: projects,
    isLoading,
    error,
  } = api.project.getProjects.useQuery();

  // Manage selected project ID in local storage
  const [projectId, setProjectId] = useLocalStorage<string>(
    "gitsus-projectId",
    "",
  );

  // Find the active project based on the stored project ID
  const project = projects?.find((project) => project.id === projectId);

  return {
    projects, // All projects
    project, // Selected project
    projectId, // Current project ID in local storage
    setProjectId, // Function to set project ID in local storage
    isLoading, // Loading state for fetching projects
    error, // Error state for fetching projects
  };
};

export default useProject;
