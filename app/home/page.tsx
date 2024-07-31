"use client"
import Navbar from "@/components/Navbar";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import course1 from "../../assets/course1Img.jpeg"
export default function Home() {
    const router=useRouter();
    const [message, setMessage] = useState('');

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
      },[]);

    return (
       <div>
        <Navbar home={true} name={message}/>
        <div className="w-full  h-screen flex justify-center items-center">
        <div className="w-[90%] h-[90%] flex flex-col justify-start">
          <div className="w-full h-[15%] bg-red-200 flex flex-col justify-start p-5 gap-1.5">
            <h1 className="font-bold text-4xl">Walk Through</h1>
            <p className="text-gray-400 text-lg">
              Stay on track—your security skills are growing!
            </p>
          </div>
          <div className="w-full h-full bg-red-300 p-5 overflow-auto flex flex-row gap-16">
            <div className="w-[30%] h-[63%]  rounded-2xl bg-white border-gray-400 border-double border-8 flex flex-col ">
              <div className="w-full h-auto ">
                <Image
                  src={course1}
                  className="object-cover rounded-lg"
                  alt="Picture"
                />
              </div>
              <div className="w-full h-full m-5 flex flex-col" >
                <h1 className="font-bold text-lg">Password Power-up</h1>
                <p className="text-gray-400 font-semibold ">Welcome to the Strong Passwords Walkthrough!</p>
                
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
        
  
    )
}