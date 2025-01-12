"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darkula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {
  atomDark,
  materialDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  filesReferences: {
    fileName: string;
    sourceCode: string;
    summary: string;
  }[];
};

const CodeReferences = ({ filesReferences }: Props) => {
  const [tab, setTab] = useState(filesReferences[0]?.fileName);

  if (filesReferences.length === 0) return null;
  return (
    <div className="scroll max-w-[80vw] p-2">
      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex flex-wrap gap-2 rounded-md p-1">
          {filesReferences.map((file) => (
            <button
              key={file.fileName}
              onClick={() => setTab(file.fileName)}
              className={cn(
                "whitespace-nowrap rounded-md border border-primary px-3 py-1.5 text-xs font-medium transition-colors",
                {
                  "bg-primary text-primary-foreground": tab === file.fileName,
                },
              )}
            >
              {file.fileName}
            </button>
          ))}
        </div>
        {filesReferences.map((file) => (
          <TabsContent
            key={file.fileName}
            value={file.fileName}
            className="h-fit w-full overflow-x-auto rounded-md"
          >
            <SyntaxHighlighter
              wrapLongLines={true}
              language="typescript"
              style={atomDark}
              customStyle={{ fontSize: "12px" }}
            >
              {file.sourceCode}
            </SyntaxHighlighter>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CodeReferences;
