"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Button } from "@/components/ui/button";
import "react-circular-progressbar/dist/styles.css";
import { Card } from "@/components/ui/card";
import { uploadFile } from "@/lib/supabaseClient";
import { Presentation, Upload } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import useProject from "@/hooks/use-project";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const MeetingCard = () => {
  // Get the current project context
  const { project } = useProject();
  const router = useRouter();

  // Set up state for upload progress tracking
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Set up mutation for processing the meeting recording
  const processMeeting = useMutation({
    mutationFn: async (data: {
      meetingUrl: string;
      meetingId: string;
      projectId: string;
    }) => {
      const { meetingUrl, meetingId, projectId } = data;
      const response = await axios.post("/api/process-meeting", {
        meetingUrl,
        meetingId,
        projectId,
      });
      return response.data;
    },
  });

  // Set up mutation for creating the meeting record in the database
  const uploadMeeting = api.project.uploadMeeting.useMutation();

  // Configure dropzone for file uploads
  const { getRootProps, getInputProps } = useDropzone({
    // Only accept audio file formats
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a"],
    },
    multiple: false,
    maxSize: 50_000_000, // 50MB limit

    // Handle file drop/selection
    onDrop: async (acceptedFiles) => {
      try {
        // Validate file selection
        if (acceptedFiles.length === 0) {
          toast.error("No file selected");
          return;
        }

        if (!project) {
          toast.error("No project selected");
          return;
        }

        setIsUploading(true);
        const file = acceptedFiles[0];

        if (!file) {
          toast.error("Invalid file");
          setIsUploading(false);
          return;
        }

        // Upload file to storage and get download URL
        const downloadURL = (await uploadFile(
          file,
          // Progress callback
          ({ progress, isComplete }) => {
            setProgress(progress);
            if (isComplete) {
              setIsUploading(false);
            }
          },
        )) as string;

        // Create meeting record in database
        const meeting = await uploadMeeting.mutateAsync({
          projectId: project.id,
          meetingUrl: downloadURL,
          name: file.name,
        });

        // Show success message and navigate to meetings page
        toast.success("Meeting uploaded successfully!");
        router.push("/meetings");

        // Start processing the meeting recording
        await processMeeting.mutateAsync({
          meetingUrl: downloadURL,
          projectId: project.id,
          meetingId: meeting.id, // Use the ID from the created meeting
        });
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to upload meeting");
        setIsUploading(false);
      }
    },
  });

  // Render the upload card UI
  return (
    <Card
      className="col-span-2 flex flex-col items-center justify-center p-10"
      {...getRootProps()}
    >
      {/* Show upload interface when not uploading */}
      {!isUploading && (
        <>
          <Presentation className="h-10 w-10 animate-bounce" />
          <h3 className="mt-2 text-center text-sm font-semibold text-gray-900">
            Create a new meeting
          </h3>
          <p className="mt-1 text-center text-sm text-gray-500">
            Analyse your meeting with GitSus
            <br />
            Powered by AI
          </p>
          <div className="mt-6">
            <Button disabled={isUploading}>
              <Upload className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Upload Meeting
              <input className="hidden" {...getInputProps()} />
            </Button>
          </div>
        </>
      )}

      {/* Show progress indicator while uploading */}
      {isUploading && (
        <div className="text-center">
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            className="mx-auto h-20 w-20"
            styles={buildStyles({
              pathColor: `rgba(124, 58, 237, ${progress / 100})`,
              textColor: "#7c3aed",
              trailColor: "none",
            })}
          />
          <p className="mx-auto mt-2 text-center text-sm text-gray-500">
            Uploading your meeting...
          </p>
        </div>
      )}
    </Card>
  );
};

export default MeetingCard;
