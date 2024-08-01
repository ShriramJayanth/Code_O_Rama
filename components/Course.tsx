import React from "react";
import Image from "next/image";
import course1 from "../assets/course1Img.jpeg";
import course2 from "../assets/course2Img.jpg"
import course3 from "../assets/course3Img.png"
const Course = () => {
  return (
    <>
      <div className="w-[30%] h-[63%]  rounded-2xl bg-white border-gray-400 border-double border-8 flex flex-col ">
        <div className="w-full h-auto ">
          <Image
            src={course1}
            className="object-cover rounded-lg"
            alt="Picture"
          />
        </div>
        <div className="w-full h-full m-5 flex flex-col">
          <h1 className="font-bold text-lg">Password Power-up</h1>
          <p className="text-gray-400 font-semibold ">
            Welcome to the Strong Passwords Walkthrough!
          </p>
        </div>
      </div>
      <div className="w-[30%] h-[63%]  rounded-2xl bg-white border-gray-400 border-double border-8 flex flex-col ">
        <div className="w-full h-auto ">
          <Image
            src={course2}
            className="object-cover rounded-lg"
            alt="Picture"
          />
        </div>
        <div className="w-full h-full m-5 flex flex-col">
          <h1 className="font-bold text-lg">Linux Terminal Essentials</h1>
          <p className="text-gray-400 font-semibold ">
            Mastering Basic Commands Course
          </p>
        </div>
      </div>
      <div className="w-[30%] h-[63%]  rounded-2xl bg-white border-gray-400 border-double border-8 flex flex-col ">
        <div className="w-full h-auto ">
          <Image
            src={course3}
            className="object-cover rounded-lg"
            alt="Picture"
          />
        </div>
        <div className="w-full h-full m-5 flex flex-col">
          <h1 className="font-bold text-lg">Python Basics Bootcamp</h1>
          <p className="text-gray-400 font-semibold ">
            Beginner's Fast-Track Course
          </p>
        </div>
      </div>
      
    </>
  );
};

export default Course;
