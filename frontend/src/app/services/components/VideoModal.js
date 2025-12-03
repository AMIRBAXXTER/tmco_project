"use client";
import React, { useState } from "react";

export default function VideoModal({ isOpen, onClose, videos }) {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-3">
      <div className="bg-white rounded-xl w-full max-w-5xl h-[85vh] flex flex-col md:flex-row overflow-hidden shadow-2xl">

        {/* ---------- LEFT: Video Player ---------- */}
        <div className="flex-1 bg-black relative flex items-center justify-center">
          <video
            key={selectedVideo.url}
            src={selectedVideo.url}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white bg-transparent rounded-full px-3 py-1 text-lg md:text-xl"
          >
            ✕
          </button>
        </div>

        {/* ---------- RIGHT: Video List ---------- */}
        <div className="w-full md:w-1/3 bg-gray-100 p-4 overflow-y-auto border-t md:border-t-0 md:border-r">

          <h2 className="font-bold text-lg mb-4 text-center">لیست ویدیو ها</h2>

          {videos.map((vid, index) => (
            <button
              key={index}
              onClick={() => setSelectedVideo(vid)}
              className={`
                block w-full text-right p-3 rounded-lg mb-2 transition font-medium
                ${selectedVideo.title === vid.title 
                  ? "bg-[#3C9BD8] text-white text-xl" 
                  : "bg-white hover:bg-[#ccebff]"}
              `}
            >
              {vid.title}
            </button>
          ))}

        </div>
      </div>
    </div>
  );
}
