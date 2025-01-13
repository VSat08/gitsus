"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import React, { useState } from "react";
import AskQuestionCard from "../dashboard/ask-question-card";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "../dashboard/code-references";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

const QAPage = () => {
  const { projectId } = useProject();
  const [open, setOpen] = useState(false);

  const { data: questions } = api.project.getQuestions.useQuery({ projectId });

  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions?.[questionIndex];

  const isMobile = useIsMobile();

  return (
    <Sheet>
      <AskQuestionCard />
      <div className="h-4"></div>
      <h1 className="text-xl font-semibold">Saved Questions</h1>
      <div className="h-2"></div>
      <div className="flex flex-col gap-2">
        {questions?.length === 0 && (
          <p className="mx-auto py-24 text-sm">No saved Question</p>
        )}
        {questions?.map((question, index) => {
          return (
            <React.Fragment key={question.id}>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-[90vw] overflow-hidden rounded-lg p-4 sm:max-w-[80vw]">
                  <DialogHeader>
                    <DialogTitle className="text-start">
                      {question.question}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="max-h-[70vh] overflow-y-scroll sm:max-w-[80vw]">
                    <MDEditor.Markdown source={question.answer} className="" />
                    <CodeReferences
                      filesReferences={(question.filesReferences ?? []) as any}
                    />
                  </div>

                  {/* <DialogFooter></DialogFooter> */}
                </DialogContent>
              </Dialog>
              {isMobile ? (
                <div
                  onClick={() => setOpen(true)}
                  className="flex cursor-pointer items-start gap-4 rounded-lg border bg-card p-4 shadow"
                >
                  <img
                    alt="user"
                    src={question.user.imageUrl!}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <div className="flex flex-col gap-1 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <p className="line-clamp-1 text-lg font-medium">
                        {question.question}
                      </p>
                      <span className="whitespace-nowrap text-xs text-slate-300">
                        {question.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="line-clamp-1 text-sm text-gray-500">
                      {question.answer}
                    </p>
                  </div>
                </div>
              ) : (
                <SheetTrigger onClick={() => setQuestionIndex(index)}>
                  <div className="flex items-start gap-4 rounded-lg border bg-card p-4 shadow">
                    <img
                      alt="user"
                      src={question.user.imageUrl!}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <div className="flex flex-col gap-1 text-left">
                      <div className="flex items-center justify-between gap-2">
                        <p className="line-clamp-1 text-lg font-medium">
                          {question.question}
                        </p>
                        <span className="whitespace-nowrap text-xs text-slate-300">
                          {question.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="line-clamp-1 text-sm text-gray-500">
                        {question.answer}
                      </p>
                    </div>
                  </div>
                </SheetTrigger>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {question && (
        <SheetContent className="sm:max-w-[80vw]">
          <SheetHeader>
            <SheetTitle>{question.question}</SheetTitle>
            <div className="max-h-[90vh] overflow-y-scroll sm:max-w-[80vw]">
              <MDEditor.Markdown source={question.answer} className="" />
              <CodeReferences
                filesReferences={(question.filesReferences ?? []) as any}
              />
            </div>
          </SheetHeader>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default QAPage;
