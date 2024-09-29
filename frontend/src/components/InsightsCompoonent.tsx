import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface InsightsComponentProps {
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  videoSrc: string;
  name: string;
  initialLikes: number;
  comments: number;
}

const InsightsComponent: React.FC<InsightsComponentProps> = ({
  isMuted,
  setIsMuted,
  videoSrc,
  name,
  initialLikes,
  comments,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = () => {
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      });
    }, options);

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
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br py-4">
      <div className="relative h-full w-full max-w-[400px] overflow-hidden rounded-3xl bg-black shadow-2xl">
        <video
          ref={videoRef}
          src={videoSrc}
          className="h-full w-full object-cover"
          loop
          muted={isMuted}
          playsInline
          onClick={togglePlayPause}
        />
        <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <div className="flex justify-end">
            <button
              onClick={toggleMute}
              className="rounded-full bg-white/20 p-2 text-white transition-all hover:scale-110 hover:bg-white/40"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="to-slate-6s00 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-gray-400 text-xl font-bold text-white shadow-lg">
                {name[0]}
              </div>
              <span className="text-xl font-semibold text-white shadow-sm">
                {name}
              </span>
            </div>
            <div className="ml-1 flex space-x-6">
              <button
                className="flex flex-col items-center text-white transition-all hover:scale-110"
                onClick={handleLike}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  className={`h-8 w-8 ${isLiked ? "text-red-500" : "text-white"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="mt-1 text-sm">{likes}</span>
              </button>
              <button className="flex flex-col items-center text-white transition-all hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="mt-1 text-sm">{comments}</span>
              </button>
              <button className="flex flex-col items-center text-white transition-all hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                <span className="mt-1 text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlayPause}
            className="pointer-events-auto rounded-full bg-white/30 p-4 text-white opacity-0 transition-all hover:bg-white/50 hover:opacity-100"
          >
            {isPlaying ? <Pause size={48} /> : <Play size={48} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsightsComponent;
