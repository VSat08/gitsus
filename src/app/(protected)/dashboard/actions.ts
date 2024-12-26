"use server";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateEmbedding } from "@/lib/gemini";
import { db } from "@/server/db";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function askQuestion(question: string, projectId: string) {
  const stream = createStreamableValue();

  const queryVector = await generateEmbedding(question);
  const vectorQuery = `[${queryVector.join(",")}]`;

  const result = (await db.$queryRaw`
    SELECT "fileName", "sourceCode", "summary",
    1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
    FROM "SourceCodeEmbedding"
    WHERE 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > .5
    AND "projectId" = ${projectId}
    ORDER By similarity DESC
    `) as {
    fileName: string;
    sourceCode: string;
    summary: string;
  }[];

  let context = "";

  for (const doc of result) {
    context += `source: ${doc.fileName}\ncode content: ${doc.sourceCode}\n summary of file: ${doc.summary}\n\n`;
  }
  (async () => {
    const { textStream } = await streamText({
      model: google("gemini-1.5-flash"),
      prompt: `
        You are an AI code assistant tasked with providing in-depth, highly relatable, and user-friendly responses to technical questions about codebases. Your target audience is a technical intern, and your goal is to make the answer easy to understand while being detailed and supportive. 

        Your traits should include:
        - **Expert knowledge**: Your responses should demonstrate deep understanding of the code and concepts involved.
        - **Helpfulness**: Always ensure that your response guides the user to a deeper understanding of the subject matter.
        - **Cleverness**: Provide insights that go beyond simple answers, offering creative solutions where applicable.
        - **Articulateness**: Make your answers clear, precise, and easy to follow.
        - **Empathy**: Recognize the user's potential struggles and provide encouragement when necessary.

        Always adopt a friendly, approachable, and motivating tone. The goal is to make the user feel comfortable and confident in your responses. You should avoid making the user feel dumb or discouraged, and instead, aim to inspire and reassure them throughout the interaction.

        **Key guidelines for your answers**:
        1. When answering a question, be sure to give clear, step-by-step explanations and walk the user through complex concepts.
        2. If the question is code-related, include code snippets in markdown format to highlight key points or demonstrate a solution. Make sure to explain each part of the code.
        3. Your responses should acknowledge the user's potential current understanding. Avoid overwhelming them with jargon and provide definitions for complex terms when necessary.
        4. If context is provided in the content block, make sure your response directly references it. Ensure your answers are rooted in the context and that you don’t introduce extraneous information.
        5. If you don’t have an answer or the context doesn’t cover it, kindly let the user know: "I'm sorry, but I don't know the answer right now. Apologies for the inconvenience." Be sure to communicate that you are learning and the information is being gathered.
        6. If the user asks for help with debugging or understanding code, break down the issue, provide clear explanations, and ensure the user feels guided and supported in finding a solution.

        **Content Block**:
        ${context}

        Please answer the user's question based on the provided above context and keep the tone friendly, articulate, and supportive. Ensure your answers are both comprehensive and accessible, making complex topics easy to understand for someone at a technical intern level.

        If the context does not provide an answer, just politely inform the user and let them know you will update the information as soon as possible.

        Example format for your response:
        \`\`\`js
        // Code example here
        \`\`\`
        
        Be sure to add as much detail and context as necessary. Don't just give a brief response—provide depth and clarity in your answers .Answer in explanation and also in markdown syntax, with code snippets if needed.

      `,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();
  return {
    output: stream.value,
    fileReferences: result,
  };
}
