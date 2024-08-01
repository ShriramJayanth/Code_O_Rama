"use client"
import Navbar from "@/components/Navbar";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Course from "@/components/Course";
export default function Home() {
    const router=useRouter();
    const [message, setMessage] = useState('');

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
      },[]);

    return (
       <div>
        <Navbar home={true} name={message}/>
        <div className="w-full  h-screen flex justify-center items-center">
        <div className="w-[90%] h-[90%] flex flex-col justify-start">
          <div className="w-full h-[15%]  flex flex-col justify-start p-5 gap-1.5">
            <h1 className="font-bold text-4xl">Walk Through</h1>
            <p className="text-gray-400 text-lg">
              Stay on track—your security skills are growing!
            </p>
          </div>
          <div className="w-full  h-full flex flex-row flex-wrap gap-10 justify-start p-5 overflow-auto   ">
            <Course/>
            


            
          </div>
        </div>
      </div>
    </div>
        
  
    )
}