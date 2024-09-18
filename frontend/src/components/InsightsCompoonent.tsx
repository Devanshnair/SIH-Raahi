import React, { useRef, useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";

const InsightsComponent = ({ videoSrc , name }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio > 0.5) {
            videoRef.current.play();
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.5, 0.99], 
    });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="video-container flex flex-col justify-center items-center relative min-w-[30vw] h-[97vh] mx-auto">
      <div
        className="video w-[30vw] h-full relative rounded-3xl bg-black overflow-hidden cursor-pointer"
        onClick={togglePlayPause}
      >
        <video
          ref={videoRef}
          className="w-[30vw]  h-auto object-cover"
          src={videoSrc}
          muted={isMuted}
          loop
          playsInline // Add this to improve mobile behavior
        ></video>
      </div>
      <div className="controls absolute bottom-4 left-4 flex flex-col space-x-4">
        <div className="px-6 flex items-center mb-2 py-2">
          <CgProfile className="text-white text-xl" />
          <p className="ml-2 text-xl text-white font-semibold">
            {name}
          </p>
        </div>
        <div className="bg-white w-24 text-black text-center px-4 py-2 rounded-full focus:outline-none">
          <button onClick={toggleMute} className="">
            {isMuted ? "Unmute" : "Mute"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsightsComponent;
