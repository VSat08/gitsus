"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import { Info, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};
const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject = api.project.createProject.useMutation();

  const checkCredits = api.project.checkCredits.useMutation();
  const refetch = useRefetch();

  const onSubmit = (data: FormInput) => {
    if (!!checkCredits.data) {
      createProject.mutate(
        {
          githubUrl: data.repoUrl,
          name: data.projectName,
          githubToken: data.githubToken,
        },
        {
          onSuccess: () => {
            toast.success("Project Created Successfully");
            refetch();
            reset();
          },
          onError: () => {
            toast.error("Oops! , failed to create one");
          },
        },
      );
    } else {
      checkCredits.mutate({
        githubUrl: data.repoUrl,
        githubToken: data.githubToken,
      });
    }
  };

  const hasEnoughCredits = checkCredits.data?.userCredits
    ? checkCredits.data.fileCount <= checkCredits.data.userCredits
    : true;
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="flex w-full flex-wrap items-center justify-center gap-12">
        <img
          src="/versioncontrol.svg"
          alt="version control"
          className="h-36 w-auto"
        />
        <div>
          <div>
            <h1 className="text-2xl font-semibold">
              Link your Github Repository
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter URL of your repository to link it to the the GitSus
            </p>
          </div>
          <div className="h-4"></div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register("projectName", { required: true })}
                placeholder="Project Name"
                required
              />
              <div className="h-2"></div>
              <Input
                {...register("repoUrl", { required: true })}
                placeholder="Github URL"
                type="url"
                required
              />
              <div className="h-2"></div>
              <Input
                {...register("githubToken")}
                placeholder="Github Token (Optional)"
              />

              {!!checkCredits.data && (
                <>
                  <div className="mt-4 rounded-md border border-orange-200 bg-orange-50/10 px-2 py-3 text-orange-300">
                    <div className="flex items-center gap-2">
                      <Info className="size-4" />
                      <p className="text-sm">
                        You will be charged{"  "}
                        <strong>{checkCredits.data?.fileCount}</strong> credits
                        for this repository.
                      </p>
                    </div>
                    <p className="ml-6 text-sm">
                      You have <strong>{checkCredits.data?.userCredits}</strong>{" "}
                      {""}
                      credits remaining.
                    </p>
                  </div>
                </>
              )}

              <div className="h-4"></div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  createProject.isPending ||
                  checkCredits.isPending ||
                  !hasEnoughCredits
                }
              >
                {!!checkCredits.data ? "Create Project" : "Check Credits"}
              </Button>
            </form>
            {!hasEnoughCredits && (
              <Link
                href="/billing"
                className="mt-4 flex w-full items-center justify-center text-sm text-primary"
              >
                Buy credits
                <TrendingUp />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
