"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown } from "@/components/DropDown";

export default function Contest() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/user", {
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

  return (
    <div className="h-[100vh]">
      <div>
        <Navbar contest={true} name={message} />
      </div>
      <div className="h-[90%] flex items-center justify-around">
        <div className="bg-gray-300 h-[90%] w-[45%]"></div>
        <div className="h-[90%] w-[45%] flex flex-col">
          <Dropdown />
          <textarea className="h-[100%] w-[100%] resize-none bg-gray-300 select-none"></textarea>
        </div>
      </div>
    </div>
  );
}
