"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Button } from "@/components/ui/button";
import "react-circular-progressbar/dist/styles.css";
import { Card } from "@/components/ui/card";
import { uploadFile } from "@/lib/supabaseClient"; // Updated import path
import { Presentation, Upload } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import useProject from "@/hooks/use-project";
import { useRouter } from "next/navigation";

const MeetingCard = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const { project } = useProject();
  const uploadMeeting = api.project.uploadMeeting.useMutation();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a"],
    },
    multiple: false,
    maxSize: 50_000_000, // 50MB
    onDrop: async (acceptedFiles) => {
      try {
        if (acceptedFiles.length === 0) {
          toast.error("No file selected");
          return;
        }

        if (!project) return;

        setIsUploading(true);
        const file = acceptedFiles[0];

        if (!file) {
          toast.error("Invalid file");
          setIsUploading(false);
          return;
        }

        const downloadURL = (await uploadFile(
          file,
          ({ progress, isComplete }) => {
            setProgress(progress);
            if (isComplete) {
              setIsUploading(false);
            }
          },
        )) as string;

        uploadMeeting.mutate({
          projectId: project?.id,
          meetingUrl: downloadURL,
          name: file.name,
        });

        toast.success("Meeting uploaded successfully!");
        router.push("/meetings");
        // console.log("File URL:", downloadURL);
        // window.alert(downloadURL);
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to upload meeting");
        setIsUploading(false);
      }
    },
  });

  return (
    <Card
      className="col-span-2 flex flex-col items-center justify-center p-10"
      {...getRootProps()}
    >
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
      {isUploading && (
        <div className="text-center">
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            className="mx-auto h-20 w-20"
            styles={buildStyles({
              pathColor: `rgba(124, 58, 237, ${progress / 100})`,
              // Customize the progress path color

              textColor: "#7c3aed", // Customize the text color
              trailColor: "none", // Customize the background trail color
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
