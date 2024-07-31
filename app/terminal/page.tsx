"use client"
import Navbar from "@/components/Navbar";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function about() {
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
        <Navbar about={true} name={message}/>
       </div>
    )
}