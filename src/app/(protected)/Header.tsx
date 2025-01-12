"use client";
import React, { useState } from "react";
import { ChevronRight, Menu, MoveRight } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import useProject from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const { projects, projectId, setProjectId } = useProject();

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[90vw] overflow-hidden rounded-lg p-4 sm:max-w-[80vw]">
          <DialogHeader>
            <DialogTitle>
              <p className="text-start text-lg font-semibold">Projects</p>
            </DialogTitle>
          </DialogHeader>
          {/* projects list */}

          {projects && projects.length > 0 ? (
            <div className="h-[40vh] overflow-auto">
              {projects?.map((project) => (
                <div
                  key={project.name}
                  className="m-2 flex cursor-pointer items-center justify-between rounded-sm border p-4 text-sm"
                  onClick={() => {
                    setProjectId(project.id);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full border bg-white text-sm text-primary",
                        {
                          "bg-primary text-white": project.id === projectId,
                        },
                      )}
                    >
                      {project.name[0]}
                    </p>
                    <span>{project.name}</span>
                  </div>

                  <ChevronRight className="text-primary" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-8">
              <p className="text-center text-sm text-secondary">No projects</p>

              <Link href="/create" onClick={() => setOpen(false)}>
                <Button className="w-full">Create Project</Button>
              </Link>
            </div>
          )}

          {/* <DialogFooter></DialogFooter> */}
        </DialogContent>
      </Dialog>
      <div className="flex items-center gap-2 rounded-md p-2 px-4 shadow">
        {/* <SearchBar/> */}
        {isMobile && (
          <Menu onClick={() => setOpen(true)} className="cursor-pointer" />
        )}
        <div className="ml-auto"></div>

        <div className="flex items-center gap-3">
          {isMobile && (
            <Link href="/create" onClick={() => setOpen(false)}>
              <Button className="w-full">Create Project</Button>
            </Link>
          )}
          <UserButton />
        </div>
      </div>
    </>
  );
};

export default Header;
