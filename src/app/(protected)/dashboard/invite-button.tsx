"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CopyIcon, CheckIcon, Share2 } from "lucide-react"; // Example icons
import useProject from "@/hooks/use-project";
import React, { useState } from "react";
import { toast } from "sonner";

const InviteButton = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { projectId } = useProject();

  const copyLink = () => {
    const link = `${window.location.origin}/join/${projectId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link copied");
    setTimeout(() => setCopied(false), 2000); // Reset state after 2 seconds
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Invite Team Members
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Share the link below with your team members to invite them to your
              project.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex items-center space-x-2">
            <Input
              readOnly
              value={`${window.location.origin}/join/${projectId}`}
              className="flex-1 cursor-pointer"
              onFocus={(e) => e.target.select()} // Allow manual selection on focus
            />
            <Button variant="secondary" size="sm" onClick={copyLink}>
              {copied ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Button size="sm" onClick={() => setOpen(true)}>
        <Share2 />
        Invite
      </Button>
    </>
  );
};

export default InviteButton;
