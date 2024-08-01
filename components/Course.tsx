import React from "react";
import Image from "next/image";

import course1 from "../assets/course1Img.jpeg";
import course2 from "../assets/course2Img.jpg";
import course3 from "../assets/course3Img.png";
import course4 from "../assets/course4Img.jpg";
import course5 from "../assets/course5Img.png";
import course6 from "../assets/course6Img.png";


interface CourseData {
  id: string;
  title: string;
  description: string;
  image: any;
}

const Course = () => {
  // Course data array
  const data: CourseData[] = [
    {
      id: "1",
      title: "Password Power-up",
      description: "Welcome to the Strong Passwords Walkthrough!",
      image: course1,
    },
    {
      id: "2",
      title: "Linux Terminal Essentials",
      description: "Beginner's Fast-Track Course",
      image: course2,
    },
    {
      id: "3",
      title: "Python Basics Bootcamp",
      description: "Beginner's Fast-Track Course",
      image: course3,
    },
    {
      id: "4",
      title: "Identifying Phishing Emails",
      description: "Learn to spot phishing emails and stay secure!",
      image: course4,
    },
    {
      id: "5",
      title: "Cryptography",
      description:
        "Securing information through encoding and decoding techniques.",
      image: course5,
    },
    {
      id: "6",
      title: "Social Engineering",
      description:
        "Manipulative tactics to deceive and exploit individuals online.",
      image: course6,
    },
  ];

  return (
    <div className="flex flex-wrap gap-8">
      {data.map((course) => (
        <div
          key={course.id}
          className="w-[30%] rounded-2xl border-gray-400 border-double border-8 flex flex-col "
        >
          <div className="w-full h-60 relative overflow-hidden rounded-lg">
            <Image
              src={course.image}
              className="object-cover"
              alt={course.title}
              layout="fill" 
            />
          </div>
          <div className="w-full flex flex-col p-5">
            <h1 className="font-bold text-lg">{course.title}</h1>
            <p className="text-gray-400 font-semibold">{course.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Course;
