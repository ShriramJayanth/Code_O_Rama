"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown } from "@/components/DropDown";
import { Button } from "@headlessui/react";
import { Editor } from "@monaco-editor/react";

export default function Contest() {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [srcCode, setSrcCode] = useState<string>("");
  const [stdin, setStdin] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://hack4change-backend.onrender.com/auth/user", {
          credentials: "include",
        });

        if (!response.ok) {
          alert("User not logged in");
          throw new Error("Not authenticated");
        }

        const content = await response.json();
        setMessage(`Hi ${content.username}`);
      } catch (e) {
        setMessage("Not logged in");
        router.push("/");
      }
    };

    fetchUser();
  }, [router]);

  const submitCode = async () => {
    setOutput("loading...");
    try {
      const response = await fetch("https://hack4change-backend.onrender.com/code/python", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceCode: srcCode,
          stdin: stdin,
          languageId: 71,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      // console.log("Submission Result:", result["stdout"]);

      // Convert newlines to <br> tags for HTML rendering
      const formattedOutput = result["stdout"].replace(/\n/g, '<br>');
      setOutput(formattedOutput);
    } catch (error) {
      console.error("Error submitting code:", error);
      setOutput("Error submitting code.");
    }
  };

  return (
    <div className="flex flex-col h-[120vh]">
      <Navbar contest={true} name={message} />

      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col p-4 gap-4">
          <div className="text-lg font-bold">Code Input</div>
          <Editor
            height="50vh"
            defaultLanguage="python"
            value={srcCode}
            onChange={(value) => setSrcCode(value || "")}
            theme="vs-dark"
          />
          <div className="text-lg font-bold">Standard Input (stdin)</div>
          <textarea
            className="w-full h-32 bg-gray-300 p-2 resize-none overflow-auto"
            onChange={(e) => setStdin(e.target.value)}
            placeholder="Enter stdin here..."
          />
        </div>

        <div className="w-1/4 p-4 flex flex-col">
          <Dropdown />
          <Button
            className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 mt-4"
            onClick={submitCode}
          >
            Submit
          </Button>
        </div>
      </div>

      <div className="h-[30vh] flex-1 p-4 bg-gray-200 overflow-auto">
        <div className="text-lg font-bold mb-2">Output</div>
        <div
          className="bg-gray-300 p-2"
          dangerouslySetInnerHTML={{ __html: output }}
        />
      </div>
    </div>
  );
}
