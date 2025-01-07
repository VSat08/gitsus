
"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard"); // Client-side redirect
  };
  return (
    <div className="h-full w-full">
      <h1 className="bg-white text-red-600">Hello World</h1>
      <Button onClick={handleClick}>Get Started</Button>
    </div>
  );
}
