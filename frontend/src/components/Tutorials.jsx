import React from "react";
import { Vortex } from "./ui/vortex";
import FitnessNavbar from "./FitnessNavbar.jsx";
const videos = [
  "otmrWml1VYg", // YouTube video IDs
  "AdNpljl8tOI",
  "ME0cj3FTbms",
  "5bgVXyP0IIM",
  "MPFFM2TOf3c",
  "IBp9TOCGIJI",
  "gBFvVIkPmww",
  "iWpFIThRcz4",
  "KdX2kh4m5Tk",
];
const Tutorials = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-black">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={220}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <FitnessNavbar />
        <h1 className="text-4xl font-bold text-center mb-6 text-white">
          Tutorials
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((videoId, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <iframe
                className="w-full h-48"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`YouTube Video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </Vortex>
    </div>
  );
};

export default Tutorials;
