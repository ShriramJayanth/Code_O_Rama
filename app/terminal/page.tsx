"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://hack4change-backend.onrender.com/auth/user", {
          credentials: "include",
        });

        if (!response.ok) {
          alert("user not logged in");
          throw new Error("Not authenticated");
        }

        const content = await response.json();
        setMessage(`Hi ${content.username}`);
      } catch (e) {
        setMessage("not logged in");
        router.push("/");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus(); // Auto-focus on load
    }
  }, []);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      try {
        const response = await fetch("https://hack4change-backend.onrender.com/code/bash", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ command: command.trim(), args: [] }),
        });

        if (!response.ok) {
          throw new Error("Command execution failed");
        }

        const result = await response.json();
        setCommand(command + "\n" + result.output);
        setOutput(result.output);

        // Scroll to the bottom of the textarea
        if (textareaRef.current) {
          textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
      } catch (error) {
        console.error("Error executing command:", error);
      }
    }
  };

  return (
    <div>
      <Navbar about={true} name={message} />
      <div className="h-[92vh] flex flex-col">
        <div className="flex-1 overflow-hidden">
          <textarea
            ref={textareaRef}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-full w-full bg-grey-300 font-mono resize-none p-4 overflow-auto"
            placeholder="Type your command here..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
